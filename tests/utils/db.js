const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require("mongoose")
const dotenv = require('dotenv');

dotenv.config({ path: '../../config.env' });

const setupDB = () => {
    return mongoose.connect(
		"mongodb+srv://Franck:NWXdclrJB2xpFGT2@cluster0-8taph.mongodb.net/test?retryWrites=true&w=majority",
		{ useNewUrlParser: true,useUnifiedTopology: true },
		() => done()
	)
}

const teardownDB = () => {
    return mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
}

module.exports = {
    setupDB,
    teardownDB
}
console.log(process.env.DATABASEDEV)