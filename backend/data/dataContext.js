const mongoose = require('mongoose');

const MongoServer = require('mongodb-memory-server').MongoMemoryServer;
const uri = 'mongodb+srv://application-user:uTFzRpPRTTDA7Ooh@myfreecluster.6lxeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const initializeDb = async () => {
	try {
		//const mongoServer = await MongoServer.create();

		await mongoose.connect(uri, {
			dbName: 'e-learning',
			useUnifiedTopology: true,
		});

		console.log('💽 ', 'Loaded Database configuration');
	}
	catch (err) {
		console.error('Error connecting to database', err);
	}
};


module.exports = {
	mongoose,
	initializeDb,
};
