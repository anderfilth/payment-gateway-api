import httpCodes from '../enums/httpCodes';

const errorDefinitions = {
  UNKNOWN: {
    key: 'UNKNOWN',
    statusCode: httpCodes.ERROR,
    message: 'API failed to execute this action through an unknown cause',
    detail: 'Unfortunately this error do not provide more information',
  },
  BAD_REQUEST_PARAMETER: {
    key: 'BAD_REQUEST_PARAMETER',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'An input value whas not accepeted',
    detail: '{parameterName: #INPUT}',
  },
  UNAUTHORIZED: {
    key: 'UNAUTHORIZED',
    statusCode: httpCodes.UNAUTHORIZED,
    message: 'access is denied due to invalid credentials',
    detail: '{parameterName: #INPUT}',
  },
};

module.exports = errorDefinitions;
