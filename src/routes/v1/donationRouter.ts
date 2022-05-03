import express, { NextFunction, Request, Response } from 'express';
import { authenticateJwtAccessToken } from '../../middlewares/authentication';
import { getAccessScopeMiddleware } from '../../middlewares/authorization';
import { DonationController } from '../../controllers/v1/donationController';
import { logger } from '../../utils/logger';
import { scopeLabels } from '../../services/scopeService';
import {
  updateFailedLog,
  updateSuccessLog,
} from '../../repositories/logRepository';
import { sendStandardResponse } from '../../utils/responseUtils';

export const donationRouter = express.Router();
const donationController = new DonationController();
donationRouter.post(
  '/donations',
  authenticateJwtAccessToken,
  getAccessScopeMiddleware({
    scope: scopeLabels.CREATE_DONATION,
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { application, accessToken, log } = res.locals;
    try {
      const result = await donationController.createDonation(req.body, {
        application,
        accessToken,
      });

      return sendStandardResponse({ res, result });
    } catch (e) {
      next(e);
    }
  },
);
