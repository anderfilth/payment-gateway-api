import sequelize from 'sequelize';
import Payable from '../models/Payable';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';

class PayableRepository {
  async store({ data, transaction }) {
    logger.debug('PayableRepository.store');
    logger.debug(JSON.stringify(data));
    try {
      const payableStore = await Payable.create(data, { transaction });
      return payableStore;
    } catch (err) {
      await transaction.rollback();
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async getBalance({ user_id }) {
    logger.debug('PayableRepository.getBalance');
    return Payable.findAll({
      attributes: [
        'payment_status',
        [sequelize.fn('sum', sequelize.col('amount')), 'total'],
      ],
      group: ['Payable.payment_status'],
      raw: true,
      where: {
        user_id,
      },
    });
  }

  async getPayable({ transaction_id, user_id }) {
    logger.debug('PayableRepository.getBalance');
    return Payable.findOne({
      where: {
        transaction_id,
        user_id,
      },
    });
  }
}

export default PayableRepository;
