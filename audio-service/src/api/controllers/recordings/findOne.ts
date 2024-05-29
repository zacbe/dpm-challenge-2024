import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { findRecordingById } from '../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const recordingId = req.params.recordingId;
  const models = req.app.get('models');

  try {
    const { recording } = await findRecordingById(recordingId, models);
    if (!recording) return next(createError(404, 'Recording not found'));

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', recording.length.toString());
    res.send(recording);
  } catch (e: any) {
    next(createError(500, e.message));
  }
}