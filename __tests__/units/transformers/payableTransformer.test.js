import payableTransformer from '../../../src/app/transformers/payableTransformer';

describe('Check payable Transformer', () => {
  it('should be able to check the response of balance without value', () => {
    const balance = [];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 0);
    expect(response).toHaveProperty('waiting_funds.amount', 0);
  });

  it('should be able to check the response of balance with available value', () => {
    const balance = [
      {
        payment_status: 'paid',
        total: 10000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 10000);
    expect(response).toHaveProperty('waiting_funds.amount', 0);
  });

  it('should be able to check the response of balance with waiting_funds value', () => {
    const balance = [
      {
        payment_status: 'waiting_funds',
        total: 10000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 0);
    expect(response).toHaveProperty('waiting_funds.amount', 10000);
  });

  it('should be able to check the response of balance with available and waiting_funds value', () => {
    const balance = [
      {
        payment_status: 'paid',
        total: 10000,
      },
      {
        payment_status: 'waiting_funds',
        total: 20000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 10000);
    expect(response).toHaveProperty('waiting_funds.amount', 20000);
  });

  it('should be able to check the response of payableOne', () => {
    const payable = {
      payment_status: 'paid',
      payment_date: '2019-01-01',
      amount: '10000',
      fee: '500',
    };
    const response = payableTransformer.payableOne(payable);
    expect(response).toHaveProperty('payment_status', 'paid');
    expect(response).toHaveProperty('payment_date', '2019-01-01');
    expect(response).toHaveProperty('amount', 10000);
    expect(response).toHaveProperty('fee', 500);
  });
});
