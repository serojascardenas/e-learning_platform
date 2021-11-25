const mongoose = require('mongoose');

const MongoServer = require('mongodb-memory-server').MongoMemoryServer;

const initializeDb = async () => {
	try {
		const mongoServer = await MongoServer.create();

		await mongoose.connect(mongoServer.getUri(), {
			dbName: 'brain-link-api',
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
