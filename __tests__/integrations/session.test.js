import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to attempt successful login', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to attempt login with not found user', async () => {
    const response = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should be able to attempt login with invalid password', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'example@example.com',
        password: '654321',
      });

    expect(response.status).toBe(401);
  });
});
