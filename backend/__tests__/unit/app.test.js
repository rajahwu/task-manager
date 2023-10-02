const request = require('supertest');
const app = require('../../app'); // Import your Express app

describe('GET /', () => {
  it('responds with "{page: \'index\'}"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ page: 'index' });
  });
});
