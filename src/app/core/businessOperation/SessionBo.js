import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';
import config from '../../../config/auth';

class SessionBo {
  constructor(params) {
    this.params = params;
    this.userRepository = new UserRepository();
  }

  async store() {
    logger.debug('SessionBo.store');
    const data = this.params.body.value;
    const user = await this.sessionValidation(data);
    const { id, name } = user;
    return {
      id,
      name,
      email: data.email,
      token: jwt.sign({ id }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    };
  }

  async sessionValidation(data) {
    logger.debug('SessionBo.sessionValidation');
    const user = await this.userRepository.findUser({ email: data.email });
    if (!user) {
      Exception.raise({
        ...errorDefinitions.UNAUTHORIZED,
        values: { '#INPUT': 'User not exist' },
      });
    }
    if (!(await user.checkPassword(data.password))) {
      Exception.raise({
        ...errorDefinitions.UNAUTHORIZED,
        values: { '#INPUT': 'Password does not match' },
      });
    }
    return user;
  }
}

export default SessionBo;
