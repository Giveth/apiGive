import { findOrganizationById } from './organizationRepository';
import { SEED_DATA } from '../../test/testUtils';
import { assert } from 'chai';
import { Log, LogStatus } from '../entities/log';
import { generateRandomString } from '../utils/utils';
import { createNewLog, updateFailedLog, updateScopeLog, updateSuccessLog } from './logRepository';
import { scopeLabels } from '../services/scopeService';

describe('createNewLog() test cases', () => {
  it('should createNewLog', async () => {
    const trackId = `${new Date().getTime()}_${generateRandomString(6)}`;
    const logData = {
      url: 'http://google.come',
      status: LogStatus.PENDING,
      trackId,
      method: 'GET',
    };
    const log = await createNewLog(logData);
    assert.isOk(log);
    assert.equal(log.trackId, trackId);
  });
});

describe('updateScopeLog() test cases', () => {
  it('should updateScopeLog', async () => {
    const trackId = `${new Date().getTime()}_${generateRandomString(6)}`;
    const logData = {
      url: 'http://google.come',
      status: LogStatus.PENDING,
      trackId,
      method: 'GET',
    };
    const log = await createNewLog(logData);
    await updateScopeLog({
      trackId,
      scope: scopeLabels.CREATE_DONATION,
    });
    const newLog = await Log.findOne({ where: { id: log.id } });
    assert.isOk(newLog);
    assert.equal(newLog?.scope, scopeLabels.CREATE_DONATION);
  });
});

describe('updateFailedLog() test cases', () => {
  it('should updateFailedLog', async () => {
    const trackId = `${new Date().getTime()}_${generateRandomString(6)}`;
    const logData = {
      url: 'http://google.come',
      status: LogStatus.PENDING,
      trackId,
      method: 'GET',
    };
    const log = await createNewLog(logData);
    await updateFailedLog({
      trackId,
      error: "testLogFailed",
      statusCode:404
    });
    const newLog = await Log.findOne({ where: { id: log.id } });
    assert.isOk(newLog);
    assert.equal(newLog?.statusCode, 404);
    assert.equal(newLog?.error, "testLogFailed");
  });
});

describe('updateSuccessLog() test cases', () => {
  it('should updateSuccessLog', async () => {
    const trackId = `${new Date().getTime()}_${generateRandomString(6)}`;
    const logData = {
      url: 'http://google.come',
      status: LogStatus.PENDING,
      trackId,
      method: 'GET',
    };
    const log = await createNewLog(logData);
    await updateSuccessLog({
      trackId,
      result: JSON.stringify(log),
      statusCode:201
    });
    const newLog = await Log.findOne({ where: { id: log.id } });
    assert.isOk(newLog);
    assert.equal(newLog?.statusCode, 201);
    assert.equal(newLog?.result, JSON.stringify(log));
  });
});
