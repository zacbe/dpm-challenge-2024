import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = {
      recording: "file.buffer",
      user_email: "userEmail"
    }

    const recording = {} // insert the recording into the database
    if (!recording) return next(createError(400, 'Error creating recording'));

    res.status(200).send('File received and will be processed.');
  } catch (e: any) {
    next(createError(500, e.message));
  }
}
