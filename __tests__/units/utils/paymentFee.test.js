import paymentFee from '../../../src/app/utils/paymentFee';

describe('Check Payment Fee', () => {
  it('should be able to check payment fee paid when property is debit_card', () => {
    expect(paymentFee.debit_card).toBe(0.03);
  });
  it('should be able to check payment fee paid when property is credit_card', () => {
    expect(paymentFee.credit_card).toBe(0.05);
  });
});
