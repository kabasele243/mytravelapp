const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require("mongoose")
const {setupDB, teardownDB} = require('./utils/db')
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });


beforeEach((done) => {
	// setupDB()
	mongoose.connect(
		process.env.DATABASEDEV,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => done()
	)
})

afterEach((done) => {
	// teardownDB()
	 mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

test('Should Get All the tours', async (done) => {
    const res = await request.get('/api/v1/tours') 
    expect(res.status).toBe(200)
    done()
}, 10000)