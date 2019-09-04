import handleError from '../../src/helpers/errors/ErrorHandler';
import logger from '../../src/helpers/logger';
/**
 * Create Request to B.O.
 * @param (funcName: string, callback: (res, data))
 * @returns returns express controller
 */

export default async (funcName, RepositoryClass, params) => {
  logger.debug('create request fake');
  try {
    const operation = new RepositoryClass();
    const response = await operation[funcName](params);
    return response;
  } catch (err) {
    const customError = handleError(err);
    return customError;
  }
};
