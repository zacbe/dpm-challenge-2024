import bodyParser from 'body-parser';
import express, { Express, Response, Request } from "express";

import { recordingRouter } from './api/routes';
import { sequelize } from './models';


(async () => {
  // initialize the squelize connection
  await sequelize.sync({ alter: true, force: false });
})();

const app: Express = express()

// Middlewares
app.use(bodyParser.json());

// Sequelize
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// Routes
app.use('/api/v1', recordingRouter);

export { app }