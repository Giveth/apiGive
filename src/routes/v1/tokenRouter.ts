import express, { Request, Response } from 'express';
import { authenticateThirdPartyBasicAuth } from '../../middlewares/authentication';
import { TokenController } from '../../controllers/v1/tokenController';
import { sendStandardResponse } from '../../utils/responseUtils';

export const tokenRouter = express.Router();
const tokenController = new TokenController();
tokenRouter.post(
  '/accessToken',
  authenticateThirdPartyBasicAuth,
  async (req: Request, res: Response, next) => {
    const { application, log } = res.locals;

    try {
      const result = await tokenController.generateAccessToken(
        {
          scopes: req.body.scopes,
        },
        {
          application,
        },
      );
      return sendStandardResponse({ res, result });
    } catch (e) {
      next(e);
    }
  },
);
