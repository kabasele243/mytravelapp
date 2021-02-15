const request = require('supertest');
const app = require('../../app'); 



test('Get all tours', async (done) => {
  await request(app)
    .get('/api/v1/tours')
    .send()
    done()
})