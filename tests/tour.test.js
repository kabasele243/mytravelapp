const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require("mongoose")


beforeEach((done) => {
	mongoose.connect(
		"mongodb+srv://Franck:NWXdclrJB2xpFGT2@cluster0-8taph.mongodb.net/test?retryWrites=true&w=majority",
		{ useNewUrlParser: true,useUnifiedTopology: true },
		() => done()
	)
})

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

test('Should Get All the tours', async (done) => {
    const res = await request.get('/api/v1/tours') 
    expect(res.status).toBe(200)
    done()
})