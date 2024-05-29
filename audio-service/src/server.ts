import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Response, Request } from "express";

import { recordingRouter } from './api/routes';
import { errorHandler } from './middleware';
import { sequelize } from './models';
import { connectRabbitMQ } from './services';
import { env } from './utils/envConfig';


(async () => {
  // initialize the squelize connection
  await sequelize.sync({ alter: true, force: false });
  connectRabbitMQ()
  .then(() => console.log('Connected to RabbitMQ'))
  .catch((err) => {
    console.error('Failed to connect to RabbitMQ', err);
    process.exit(1);
  });
})();

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

// Routes
app.use('/api/v1', recordingRouter);

app.use(errorHandler);

export { app }