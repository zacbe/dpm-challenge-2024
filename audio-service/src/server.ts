import express, { Express, Response, Request } from "express";

import { recordingRouter } from './api/routes';
import { sequelize } from './models';


(async () => {
  // initialize the squelize connection
  await sequelize.sync({ alter: true, force: false });
})();

const app: Express = express()

// Routes
app.use('/api/v1', recordingRouter);

export { app }