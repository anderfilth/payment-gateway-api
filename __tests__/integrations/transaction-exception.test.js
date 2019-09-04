import truncate from '../util/truncate';
import TransactionRepository from '../../src/app/core/repositories/TransactionRepository';
import operatorFake from '../util/operatorFake';

describe('Transaction with credit card', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to cause an exception when to try store transaction with null data', async () => {
    const params = {
      data: null,
    };
    await expect(
      operatorFake('store', TransactionRepository, params)
    ).resolves.toHaveProperty('statusCode', 500);
  });
});
