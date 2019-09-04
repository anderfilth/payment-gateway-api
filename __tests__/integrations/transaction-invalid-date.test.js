import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Transaction with card date expiration invalid', () => {
  let user;
  beforeEach(async () => {
    await truncate();
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });
    const res = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'example@example.com',
        password: '123456',
      });
    user = res.body;
  });

  it('must add an invalid card expiration date and go wrong', async () => {
    const response = await request(app)
      .post('/api/v1/transactions')
      .set('appToken', user.token)
      .send({
        description: 'Smartband XYZ 4.0',
        amount: 10000,
        payment_method: 'debit_card',
        card_number: '4111111111111111',
        card_name: 'John Johnson',
        card_expiration_date: '9999',
        card_cvv: '123',
      });
    expect(response.status).toBe(400);
  });
});
