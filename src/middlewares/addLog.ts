import { NextFunction, Request, Response } from 'express';
import { StandardError } from '../types/StandardError';
import { errorMessagesEnum } from '../utils/errorMessages';
import { createNewLog } from '../repositories/logRepository';
import { LogStatus } from '../entities/log';
import { generateRandomString } from '../utils/utils';

export const addLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = req.url;
  const trackId = `${new Date().getTime()}_${generateRandomString(6)}`;
  await createNewLog({
    url,
    status: LogStatus.PENDING,
    method: req.method,
    trackId,
    ip : String(req.headers['x-forwarded-for'] || req.socket.remoteAddress) || ""
  });
  res.locals.trackId = trackId;
  next();
};
