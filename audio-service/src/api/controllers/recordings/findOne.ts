import { NextFunction, Request, Response } from 'express';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  res.status(200)
}