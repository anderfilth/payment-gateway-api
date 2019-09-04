import paymentStatus from '../../../src/app/utils/paymentStatus';

describe('Check Payment Status', () => {
  it('should be able to check payment status paid when property is debit_card', () => {
    expect(paymentStatus.debit_card).toBe('paid');
  });
  it('should be able to check payment status paid when property is credit_card', () => {
    expect(paymentStatus.credit_card).toBe('waiting_funds');
  });
});
