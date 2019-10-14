import User from '../models/User';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';

class UserRepository {
  async store(data) {
    logger.debug('UserRepository.store');
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async update({ data, id }) {
    logger.debug('UserRepository.update');
    try {
      let user = await User.findOne({
        where: { id },
      });
      user = await user.update(data);
      return user;
    } catch (err) {
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async findUser({ email, id }) {
    logger.debug('UserRepository.findUser');
    const where = {};
    if (email) {
      where.email = email;
    }
    if (id) {
      where.id = id;
    }
    return User.findOne({
      where,
    });
  }
}

export default UserRepository;
