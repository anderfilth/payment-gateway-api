import createRequest from '../../helpers/createRequest';
import TransactionBo from '../core/businessOperation/TransactionBo';
import httpCodes from '../../helpers/enums/httpCodes';

const CONTROLLER_NAME = 'transaction';

module.exports = {
  /** --- CREATE ------------------------------------------- */
  store: createRequest(CONTROLLER_NAME, 'store', TransactionBo, (res, data) => {
    res.status(httpCodes.CREATED).json(data);
  }),

  getTransactions: createRequest(
    CONTROLLER_NAME,
    'getTransactions',
    TransactionBo,
    (res, data) => {
      res.status(httpCodes.OK).json(data);
    }
  ),
};
