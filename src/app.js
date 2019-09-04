import './bootstrap';
import express from 'express';
import swaggerTools from 'swagger-tools';
import bodyParser from 'body-parser';
import cors from 'cors';
import { resolve } from 'path';
import jwt from 'jsonwebtoken';
import Exception from './helpers/errors/Exception';
import errorDefinitions from './helpers/errors/errorDefinitions';
import handleError from './helpers/errors/ErrorHandler';
import logger from './helpers/logger';
import config from './config/auth';
import httpCodes from './helpers/enums/httpCodes';

import swaggerDoc from './swagger/swagger.json';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.swagger();
  }

  middleware() {
    this.server.use(express.json());
  }

  swagger() {
    const options = {
      swaggerUi: './swagger/swagger.json',
      controllers: resolve(__dirname, 'app', 'controllers'),
    };
    swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
      this.server.use(bodyParser.json({ limit: '1MB' }));
      this.server.use(middleware.swaggerMetadata());
      this.server.use(
        cors({
          headers: '*',
        })
      );
      this.server.use(middleware.swaggerValidator());
      this.server.use(
        middleware.swaggerSecurity({
          appToken(req, def, token, callback) {
            try {
              const user = jwt.verify(token, config.secret);
              logger.info(`appToken user: ${JSON.stringify(user)}`);
              req.swagger.params = {
                ...req.swagger.params,
                userId: { value: user.id },
              };
              callback();
            } catch (ex) {
              logger.error('invalid AppToken', ex);
              if (token === undefined) {
                req.res.status(401).json([
                  {
                    code: httpCodes.UNAUTHORIZED,
                    date: new Date(),
                    message: 'AppToken is Required',
                    details: 'AppToken is Required',
                  },
                ]);
              } else {
                req.res.status(401).json([
                  {
                    code: httpCodes.UNAUTHORIZED,
                    date: new Date(),
                    message: 'Invalid AppToken',
                    details: 'invalid AppToken',
                  },
                ]);
              }
              req.res.end();
            }
          },
        })
      );
      this.server.use(this.customErrorHandler);
      this.server.use(middleware.swaggerRouter(options));
      this.server.use(
        middleware.swaggerUi({
          swaggerUi: '/docs/',
        })
      );
    });
  }

  customErrorHandler(err, req, res, next) {
    let customError = Exception.generateCustomError({
      ...errorDefinitions.BAD_REQUEST_PARAMETER,
      values: {
        '#INPUT':
          `${err.paramName} : ${JSON.stringify((err.results || {}).errors)}` ||
          'not set',
      },
      message: `swagger validation: code:${err.code ||
        'not set'} message:${err.message || 'not set'}`,
      stack: err.stack || undefined,
    });
    customError = handleError(customError, req.headers['debug-trace']);
    res.status(customError.statusCode).json(customError.response);
  }
}

export default new App().server;
