import PayableRepository from '../repositories/PayableRepository';
import logger from '../../../helpers/logger';
import payableTransformer from '../../transformers/payableTransformer';

class PayableBo {
  constructor(params) {
    this.params = params;
    this.payableRepository = new PayableRepository();
  }

  async getBalance() {
    logger.debug('PayableBo.getBalance');
    const params = {
      user_id: this.params.userId.value,
    };
    const data = await this.payableRepository.getBalance(params);
    return payableTransformer.balance(data);
  }

  async getPayable() {
    logger.debug('PayableBo.getPayable');
    const params = {
      transaction_id: this.params.transaction_id.value,
      user_id: this.params.userId.value,
    };
    const data = await this.payableRepository.getPayable(params);
    return payableTransformer.payableOne(data);
  }
}

export default PayableBo;
