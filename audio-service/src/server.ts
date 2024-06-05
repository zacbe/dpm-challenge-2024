import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Response, Request } from "express";

import { recordingRouter } from './api/routes';
import { errorHandler } from './middleware';
import { sequelize } from './models';
import { connectRabbitMQ, consumeCompletionNotifications } from './services';
import { env } from './utils/envConfig';

const clients: Response[] = [];
const eventsHandler = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
};


(async () => {
  // Initialize the Sequelize connection
  await sequelize.sync({ alter: true, force: false });
  connectRabbitMQ()
    .then(() => {
      console.log('Connected to RabbitMQ');
      consumeCompletionNotifications(notifyClients);
    })
    .catch((err) => {
      console.error('Failed to connect to RabbitMQ', err);
      process.exit(1);
    });
})();

const notifyClients = (message: string) => {
  clients.forEach(client => client.write(`data: ${message}\n\n`));
};

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
};

const app: Express = express();

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Sequelize
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// SSE endpoint
app.get('/events', eventsHandler);

// Routes
app.use('/api/v1', recordingRouter);

app.use(errorHandler);

export { app }