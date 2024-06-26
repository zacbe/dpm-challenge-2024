import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { env } from '../../../utils/envConfig';

import { insertRecording, publishToQueue } from '../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const file = req.file;
  const userEmail = req.body.email;

  if (!file) return next(createError(400, 'No file uploaded.'));

  try {
    const body = {
      recording: file.buffer,
      user_email: userEmail
    }

    const recording = await insertRecording(body, models);
    if (!recording) return next(createError(400, 'Error creating recording'));

    const message = JSON.stringify({
      id: recording.id,
      user_email: recording.user_email,
      timestamp: new Date().toISOString(),
    });

    await publishToQueue(env.JOB_QUEUE, message);
    res.status(200).send('File received and will be processed.');
  } catch (e: any) {
    next(createError(500, e.message));
  }
}
