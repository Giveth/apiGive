import { redis } from '../../services/redis';
import { Admin, AdminRole } from '../../entities/admin';
// eslint:disable-next-line:no-var-requires
const AdminJS = require('adminjs');
// eslint:disable-next-line:no-var-requires
const bcrypt = require('bcrypt');
// eslint:disable-next-line:no-var-requires
const session = require('express-session');
const secret = process.env.ADMIN_BRO_COOKIE_SECRET || 'test_secret';
// eslint:disable-next-line:no-var-requires
const AdminJSExpress = require('@adminjs/express');
import { Database, Resource } from '@adminjs/typeorm';
import { findAdminByEmail } from '../../repositories/adminRepository';
import { logger } from '../../utils/logger';
import { Application } from '../../entities/application';
import { Organization } from '../../entities/organization';
import { Log } from '../../entities/log';
import { AccessToken } from '../../entities/accessToken';

// eslint:disable-next-line:no-var-requires
const RedisStore = require('connect-redis')(session);

interface AdminBroContextInterface {
  h: any;
  resource: any;
  records: any[];
  currentAdmin: Admin;
  payload?: any;
}

interface AdminBroRequestInterface {
  payload?: any;
  record?: any;
  query?: {
    recordIds?: string;
  };
}

AdminJS.registerAdapter({ Database, Resource });

export const getAdminBroRouter = async () => {
  return AdminJSExpress.buildAuthenticatedRouter(
    await getAdminBroInstance(),
    {
      authenticate: async (email: string, password: string) => {
        try {
          const user = await findAdminByEmail(email);
          if (user) {
            const matched = await bcrypt.compare(
              password,
              user.encryptedPassword,
            );
            if (matched) {
              return user;
            }
          }
          return false;
        } catch (e) {
          logger.error({ e });
          return false;
        }
      },
      cookiePassword: secret,
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      rolling: false,
      secret,
      store: new RedisStore({
        client: redis,
      }),
    },
  );
};


const getAdminBroInstance = async () => {
  return new AdminJS({
    branding: {
      logo: 'https://i.imgur.com/cGKo1Tk.png',
      favicon:
        'https://icoholder.com/media/cache/ico_logo_view_page/files/img/e15c430125a607a604a3aee82e65a8f7.png',
      companyName: 'Giveth',
      softwareBrothers: false,
    },
    resources: [
      {
        resource: Application,
        options: {
          properties: {
            organizationId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            id: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },

            label: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: false,
              },
            },
            isActive: {
              isVisible: true,
            },
            name: {
              isVisible: true,
            },
            secret: {
              isVisible: true,
            },
            scopes: {
              isVisible: true,
            },
            logo: {
              isVisible: true,
            },
            allowedRequestsPerHour: {
              isVisible: true,
            },
            organization: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
          },
          actions: {
            bulkDelete: {
              isVisible: false,
            },
            edit: {
              isVisible: true,
            },
            delete: {
              isVisible: false,
            },
          },
        },
      },
      {
        resource: Organization,
        options: {
          properties: {
            id: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },

            name: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
            isVerified: {
              isVisible: true,
            },
            isActive: {
              isVisible: true,
            },
            website: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
          },
          actions: {
            bulkDelete: {
              isVisible: false,
            },
            edit: {
              isVisible: true,
            },
            delete: {
              isVisible: false,
            },
          },
        },
      },
      {
        resource: Log,
        options: {
          properties: {
            id: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },


            updatedAt: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            createdAt: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            url: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            method: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            status: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            ip: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            scope: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            statusCode: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            error: {
              isVisible: {
                list: true,
                filter: false,
                show: true,
                edit: false,
                new: false,
              },
            },
            trackId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            result: {
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: false,
                new: false,
              },
            },
            accessTokenId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            applicationId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            }

          },
          actions: {
            bulkDelete: {
              isVisible: false,
            },
            edit: {
              isVisible: false,
            },
            delete: {
              isVisible: false,
            },
            new: {
              isVisible: false,
            },
          },
        },
      },
      {
        resource: Admin,
        options: {
          properties: {
            adminId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            encryptedPassword: {
              isVisible: false,
            },
            password: {
              type: 'string',
              isVisible: {
                list: false,
                edit: true,
                filter: false,
                show: false,
              },
            },
            firstName: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
            lastName: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
            email: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
            role: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: true,
                new: true,
              },
            },
          },
          actions: {
            delete: {
              isVisible: false,
            },
            bulkDelete: {
              isVisible: false,
            },
            new: {
              isAccessible: (params: { currentAdmin: Admin }) =>
                params.currentAdmin && params.currentAdmin.role === AdminRole.SUPER_ADMIN,
              before: async (
                request: AdminBroRequestInterface,
                context: AdminBroContextInterface,
              ) => {
                if (request.payload.password) {
                  const bc = await bcrypt.hash(
                    request.payload.password,
                    Number(process.env.BCRYPT_SALT),
                  );
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: bc,
                    password: null,
                  };
                }
                return request;
              },
            },
            edit: {
              isAccessible: (params: { currentAdmin: Admin }) =>
                params.currentAdmin && params.currentAdmin.role === AdminRole.SUPER_ADMIN,
              before: async (request: AdminBroRequestInterface,
                             context: AdminBroContextInterface) => {
                logger.debug({ request: request.payload });
                if (request.payload.password) {
                  const bc = await bcrypt.hash(
                    request.payload.password,
                    Number(process.env.BCRYPT_SALT),
                  );
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: bc,
                    password: null,
                  };
                }
                return request;
              },
            },
          },

        },
      },
      {
        resource: AccessToken,
        options: {
          actions: {
            bulkDelete: {
              isVisible: false,
            },
            edit: {
              isVisible: false,
            },
            delete: {
              isVisible: false,
            },
            new: {
              isVisible: false,
            },
          },
          properties: {
            id: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            },
            expirationDate: {
              isVisible:false
            },
            jwt: {
              isVisible:false
            },
            jti: {
              isVisible:false
            },
            scopes: {
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: false,
                new: false,
              },
            },
            isActive: {
              isVisible: true
            },
            applicationId: {
              isVisible: {
                list: true,
                filter: true,
                show: true,
                edit: false,
                new: false,
              },
            }

          },


        },

      }
    ],
    rootPath: adminJsRootPath,
  });
};


export const adminJsRootPath = '/admin';
