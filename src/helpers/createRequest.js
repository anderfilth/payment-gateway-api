import handleError from './errors/ErrorHandler';
import httpCodes from './enums/httpCodes';
import logger from './logger';
/**
 * Create Request to B.O.
 * @param (funcName: string, callback: (res, data))
 * @returns returns express controller
 */
function createRequest(modelName, funcName, OperationClass, callback) {
  return async (req, res) => {
    logger.debug(`${modelName}Controller.${funcName}`);
    try {
      const operation = new OperationClass(req.swagger.params);
      const data = await operation[funcName]();
      if (callback) {
        callback(res, data);
        return false;
      }
      let result = data;
      if (data.contentRange && data.data) {
        result = result.data;
        res.set('contentRange', data.contentRange);
        res.set('acceptRange', result.length);
      }
      return res.status(httpCodes.OK).json(result);
    } catch (err) {
      const customError = handleError(err, req.headers['debug-trace']);
      return res
        .status(customError.statusCode || httpCodes.ERROR)
        .json(customError.response);
    }
  };
}

export default createRequest;
