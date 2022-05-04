import { generateRandomString } from '../utils/utils';
import { Log, LogStatus } from '../entities/log';
import { createNewLog } from '../repositories/logRepository';
import { assert } from 'chai';
import { createAccessTokenForTest, SEED_DATA, serverUrl, sleep } from '../../test/testUtils';
import axios from 'axios';
import { scopeLabels } from '../services/scopeService';
import { createBasicAuthentication } from '../utils/authorizationUtils';

describe('add log for failed requests,  test cases', () => {
  it('should add log for failed requests without applicationId for accessToken service successfully', async () => {
    const applicationData = SEED_DATA.firstApplication;

    try {
      const result = await axios.post(
        `${serverUrl}/v1/accessToken`,
        {
          scopes: [scopeLabels.CREATE_DONATION],
        },
        {
          headers: {
            authorization: createBasicAuthentication({
              username: applicationData.label,
              secret: 'falseSecret',
            }),
          },
        },
      );
    } catch (e:any) {
      await sleep(1000)
      const newLog = await Log.findOne({where:{trackId:e.response.data.trackId}})
      assert.equal(e.response.data.httpStatusCode,newLog?.statusCode);
      assert.equal(newLog?.url,"/v1/accessToken");
      assert.equal(newLog?.method,'POST');
      assert.equal(newLog?.status,LogStatus.FAILED);
      assert.isNotOk(newLog?.applicationId);

    }
  });
  it('should add log for failed requests with applicationId for accessToken service successfully', async () => {
    const applicationData = SEED_DATA.firstApplication;

    try {
      const result = await axios.post(
        `${serverUrl}/v1/accessToken`,
        {
          scopes: ["invalidScopeLabel"],
        },
        {
          headers: {
            authorization: createBasicAuthentication({
              username: applicationData.label,
              secret: applicationData.secret,
            }),
          },
        },
      );
    } catch (e:any) {
      await sleep(1000)
      const newLog = await Log.findOne({where:{trackId:e.response.data.trackId}})
      assert.equal(e.response.data.httpStatusCode,newLog?.statusCode);
      assert.equal(newLog?.url,"/v1/accessToken");
      assert.equal(newLog?.method,'POST');
      assert.equal(newLog?.status,LogStatus.FAILED);
      assert.equal(newLog?.applicationId,applicationData.id);

    }
  });

  it('should add log for failed requests with applicationId for create donation service successfully', async () => {
    const applicationData = SEED_DATA.firstApplication;

    try {
      const applicationData = SEED_DATA.firstApplication;
      const accessToken = await createAccessTokenForTest({
        scopes: [scopeLabels.CREATE_DONATION],
        applicationId: applicationData.id,
      });
      const result = await axios.post(
        `${serverUrl}/v1/donations`,
        {
          network: 'gnosis',
          txHash:
            '0x9a474c4791e526e35941dd8dd146405f15860fa19aca4abb5e0a4225294c36e0',
          nonce: 274,
          toWalletAddress: '0x4D9339dd97db55e3B9bCBE65dE39fF9c04d1C2cd',
          fromWalletAddress: '0xEf191aeb45A0d6f393D4a592f94152836d5758f8',
          priceUsd: 0.2403,
          currency: 'GIV',
          amount: 0,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken.jwt}`,
          },
        },
      );
    } catch (e:any) {
      await sleep(1000)
      const newLog = await Log.findOne({where:{trackId:e.response.data.trackId}})
      assert.equal(e.response.status,newLog?.statusCode);
      assert.equal(newLog?.url,"/v1/donations");
      assert.equal(newLog?.method,'POST');
      assert.equal(newLog?.status,LogStatus.FAILED);
      assert.equal(newLog?.applicationId,applicationData.id);

    }
  });
});

//TODO Fagha ask if add trackId to success response or not

// describe('add log for success requests,  test cases', () => {
//   it('should add log for success requests successfully', async () => {
//     const applicationData = SEED_DATA.firstApplication;
//       const result = await axios.post(
//         `${serverUrl}/v1/accessToken`,
//         {
//           scopes: [scopeLabels.CREATE_DONATION],
//         },
//         {
//           headers: {
//             authorization: createBasicAuthentication({
//               username: applicationData.label,
//               secret: applicationData.secret,
//             }),
//           },
//         },
//       );
//       console.log("resultttt",result.data)
//       await sleep(1000)
//       const newLog = await Log.findOne({where:{trackId:result.data.trackId}})
//       assert.equal(result.data.httpStatusCode,newLog?.statusCode);
//       assert.equal(newLog?.url,"accessToken");
//       assert.equal(newLog?.method,'POST');
//       assert.equal(newLog?.status,LogStatus.DONE);
//       assert.equal(newLog?.applicationId,applicationData.id);
//
//     })
// });
