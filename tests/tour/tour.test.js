const request = require('supertest');
const app = require('../../app'); 

test('Get all tours', function (done){
  request(app)
    .get('/api/v1/tours')
    .expect(200, done)
})