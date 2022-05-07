import { NextFunction, Request, Response } from 'express';
import { decodeBasicAuthentication } from '../utils/authorizationUtils';
import { findActiveTokenByValue } from '../repositories/accessTokenRepository';
import {
  findApplicationById,
  findApplicationByLabelAndSecret,
} from '../repositories/applicationRepository';
import { StandardError } from '../types/StandardError';
import { errorMessagesEnum } from '../utils/errorMessages';
import { updateAccessTokenAndApplication } from '../repositories/logRepository';

export const authenticateThirdPartyBasicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      throw new StandardError(errorMessagesEnum.UNAUTHORIZED);
    }
    const { username, secret } = decodeBasicAuthentication(authorization);
    const application = await findApplicationByLabelAndSecret({
      label: username,
      secret,
    });
    if (!application) {
      throw new StandardError(errorMessagesEnum.UNAUTHORIZED);
    }
    updateAccessTokenAndApplication({
      application,
      trackId: res.locals.trackId,
    });
    res.locals.application = application;
    next();
  } catch (e) {
    console.log('authenticateThirdPartyBasicAuth error', e);
    next(e);
  }
};

export const authenticateJwtAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization as string;
  if (!authorization) {
    throw new StandardError(errorMessagesEnum.UNAUTHORIZED);
  }
  const accessToken = await findActiveTokenByValue(authorization.split(' ')[1]);
  if (!accessToken) {
    throw new StandardError(errorMessagesEnum.UNAUTHORIZED);
  }
  const application = await findApplicationById(accessToken.applicationId);
  if (!application) {
    throw new StandardError(errorMessagesEnum.UNAUTHORIZED);
  }
  res.locals.accessToken = accessToken;
  res.locals.application = application;
  updateAccessTokenAndApplication({
    accessToken,
    application,
    trackId: res.locals.trackId,
  });
  next();
};
