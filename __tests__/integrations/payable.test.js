import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import PayableRepository from '../../src/app/core/repositories/PayableRepository';
import operatorFake from '../util/operatorFake';

describe('Payable', () => {
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

  it('should try to bring the balance', async () => {
    const response = await request(app)
      .get('/api/v1/balance')
      .set('appToken', user.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('available.amount');
    expect(response.body).toHaveProperty('waiting_funds.amount');
  });

  it('should be able to cause an exception when to try store payable with null data', async () => {
    const params = {
      data: null,
      transaction: null,
    };
    await expect(
      operatorFake('store', PayableRepository, params)
    ).resolves.toHaveProperty('statusCode', 500);
  });
});
