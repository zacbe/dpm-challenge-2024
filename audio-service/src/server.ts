import express, { Express, Response, Request } from "express";

import { recordingRouter } from './api/routes';

const app: Express = express()

// Routes
app.use('/api/v1', recordingRouter);

export { app }