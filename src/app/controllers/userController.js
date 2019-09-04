import createRequest from '../../helpers/createRequest';
import UserBo from '../core/businessOperation/UserBo';
import httpCodes from '../../helpers/enums/httpCodes';

const CONTROLLER_NAME = 'user';

module.exports = {
  /** --- CREATE ------------------------------------------- */
  store: createRequest(CONTROLLER_NAME, 'store', UserBo, (res, data) => {
    res.status(httpCodes.CREATED).json(data);
  }),

  update: createRequest(CONTROLLER_NAME, 'update', UserBo, res => {
    res.status(httpCodes.NO_CONTENT).end();
  }),
};
