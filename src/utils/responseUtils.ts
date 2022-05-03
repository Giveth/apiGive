import express, { Request, Response } from 'express';
import { updateSuccessLog } from '../repositories/logRepository';

export const sendStandardResponse = (
  data: {
    res: Response;
    result: any;
  },
  httpStatusCode = 200,
) => {
  const { res, result } = data;
  const trackId = res.locals.trackId;
  updateSuccessLog({
    trackId,
    result: JSON.stringify(result),
    statusCode:httpStatusCode,
  });
  res.status(httpStatusCode).send(result);
};
