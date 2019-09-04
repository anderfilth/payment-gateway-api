import { Op } from 'sequelize';
import Transaction from '../models/Transaction';
import db from '../../../database';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';

const conn = db.getConnection();

class TransactionRepository {
  async getDbTransaction() {
    logger.debug('TransactionRepository.getTransaction');
    return conn.transaction();
  }

  async store({ data, transaction }) {
    logger.debug('TransactionRepository.store');
    try {
      const transactionStore = await Transaction.create(data, { transaction });
      return transactionStore;
    } catch (err) {
      await transaction.rollback();
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async getTransactions({ id, user_id, limit, offset }) {
    logger.debug('TransactionRepository.getTransactions');
    const andWhere = [];
    andWhere.push({
      user_id,
    });
    if (id) {
      andWhere.push({
        id,
      });
    }
    return Transaction.findAndCountAll({
      limit,
      offset,
      where: { [Op.and]: andWhere },
    });
  }
}

export default TransactionRepository;
