import createRequest from '../../helpers/createRequest';
import SessionBo from '../core/businessOperation/SessionBo';
import httpCodes from '../../helpers/enums/httpCodes';

const CONTROLLER_NAME = 'session';

module.exports = {
  /** --- CREATE ------------------------------------------- */
  store: createRequest(CONTROLLER_NAME, 'store', SessionBo, (res, data) => {
    res.status(httpCodes.CREATED).json(data);
  }),
};
