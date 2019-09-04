import createRequest from '../../helpers/createRequest';
import PayableBo from '../core/businessOperation/PayableBo';
import httpCodes from '../../helpers/enums/httpCodes';

const CONTROLLER_NAME = 'payable';

module.exports = {
  getBalance: createRequest(
    CONTROLLER_NAME,
    'getBalance',
    PayableBo,
    (res, data) => {
      res.status(httpCodes.OK).json(data);
    }
  ),
  getPayable: createRequest(
    CONTROLLER_NAME,
    'getPayable',
    PayableBo,
    (res, data) => {
      res.status(httpCodes.OK).json(data);
    }
  ),
};
