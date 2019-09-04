import moment from 'moment';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import TransactionRepository from '../repositories/TransactionRepository';
import PayableRepository from '../repositories/PayableRepository';
import logger from '../../../helpers/logger';
import paymentStatus from '../../utils/paymentStatus';
import paymentFee from '../../utils/paymentFee';
import paymentDate from '../../utils/paymentDate';
import transactionTransformer from '../../transformers/transactionTransformer';

class TransactionBo {
  constructor(params) {
    this.params = params;
    this.transactionRepository = new TransactionRepository();
    this.payableRepository = new PayableRepository();
  }

  async store() {
    logger.debug('TransactionBo.store');
    // set transaction data
    const transactionData = this.params.body.value;
    transactionData.user_id = this.params.userId.value;

    await this.transactionValidation(transactionData);
    // get db transaction and use in the following operations
    const transaction = await this.transactionRepository.getDbTransaction();
    // store transaction date and injection db transaction
    const transactionStore = await this.transactionRepository.store({
      data: transactionData,
      transaction,
    });
    // set payable data
    const payableData = {
      user_id: this.params.userId.value,
      transaction_id: transactionStore.id,
    };
    // transform payload to payable store baseade on business rules
    payableData.payment_status = paymentStatus[transactionData.payment_method];
    payableData.fee =
      transactionData.amount * paymentFee[transactionData.payment_method];
    payableData.amount = transactionData.amount - payableData.fee;
    payableData.payment_date = paymentDate[transactionData.payment_method];
    // store payable date and injection db transaction
    await this.payableRepository.store({
      data: payableData,
      transaction,
    });
    // payable store will call db transaction commit
    return transactionTransformer.transactionOne(transactionStore);
  }

  async transactionValidation(data) {
    logger.debug('TransactionBo.transactionValidation');
    const creditCardDate = moment(data.card_expiration_date, 'MMYY');
    const today = moment();

    if (
      !creditCardDate.isValid() ||
      !(today < creditCardDate.add(1, 'months'))
    ) {
      Exception.raise({
        ...errorDefinitions.BAD_REQUEST_PARAMETER,
        values: { '#INPUT': 'Card expiration date invalid' },
      });
    }
  }

  async getTransactions() {
    logger.debug('TransactionBo.getTransactions');
    const params = {
      id: this.params.id.value,
      user_id: this.params.userId.value,
      limit: this.params.id.value,
      offset: this.params.id.value,
    };
    const data = await this.transactionRepository.getTransactions(params);
    return transactionTransformer.transactions(data);
  }
}

export default TransactionBo;
