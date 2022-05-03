import { Log, LogStatus } from '../entities/log';
import { Column, Index, ManyToOne, RelationId } from 'typeorm';
import { AccessToken } from '../entities/accessToken';
import { Application } from '../entities/application';

export const createNewLog = async (params: {
  url: string;
  status: string;
  trackId: string;
  method: string;
}): Promise<Log> => {
  return Log.create({ ...params }).save();
};

export const updateScopeLog = async (data: {
  trackId: string;
  scope: string;
}) => {
  const { trackId, scope } = data;
  return Log.update({ trackId }, { scope });
};

export const updateFailedLog = async (data: {
  trackId: string;
  error: string;
  statusCode: number;
}) => {
  const { trackId, error, statusCode } = data;
  return Log.update(
    { trackId },
    { status: LogStatus.FAILED, error, statusCode },
  );
};

export const updateSuccessLog = async (data: {
  trackId: string;
  result: string;
  httpStatusCode: number;
}) => {
  const { trackId, result, httpStatusCode } = data;
  return Log.update(
    { trackId },
    { status: LogStatus.DONE, result, statusCode: httpStatusCode },
  );
};

export const updateAccessTokenAndApplication = (data: {
  trackId: string;
  accessToken: AccessToken;
  application: Application;
}) => {
  const { trackId, application, accessToken } = data;
  return Log.update({ trackId }, { application, accessToken });
};
