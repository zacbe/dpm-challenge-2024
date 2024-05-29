import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
    const recording = {} // find the recording in the database
    if (!recording) return next(createError(404, 'Recording not found'));
    
    res.send(recording);
  } catch (e: any) {
    next(createError(500, e.message));
  }
}