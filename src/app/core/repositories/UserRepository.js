import User from '../models/User';
import db from '../../../database';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';

const conn = db.getConnection();

class UserRepository {
  async store(data) {
    logger.debug('UserRepository.store');
    let transaction;
    try {
      transaction = await conn.transaction();
      const user = await User.create(data, { transaction });
      await transaction.commit();
      return user;
    } catch (err) {
      await transaction.rollback();
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async update({ data, id }) {
    logger.debug('UserRepository.update');
    let transaction;
    try {
      transaction = await conn.transaction();
      let user = await User.findOne({
        where: { id },
      });
      user = await user.update(data, { transaction });
      await transaction.commit();
      return user;
    } catch (err) {
      await transaction.rollback();
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
