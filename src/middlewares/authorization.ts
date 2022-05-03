import { NextFunction, Request, Response } from 'express';
import { StandardError } from '../types/StandardError';
import { errorMessagesEnum } from '../utils/errorMessages';
import { updateFailedLog, updateScopeLog } from '../repositories/logRepository';

export const getAccessScopeMiddleware = (params: { scope: string }) => {
  const { scope } = params;
  return (_req: Request, res: Response, next: NextFunction) => {
    const accessToken = res.locals.accessToken;
    const trackId = res.locals.log.trackid;
    updateScopeLog({ trackId, scope });

    if (accessToken.scopes.includes(scope)) {
      return next();
    }
    const error = new StandardError(
      errorMessagesEnum.TOKEN_DOESNT_HAVE_ACCESS_TO_THIS_SCOPE,
    );
    error.message += scope;
    throw error;
  };
};
