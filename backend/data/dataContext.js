const config = require('../utils/config-loader');
const mongoose = require('mongoose');

const { dbUser, dbPwd, dbName } = config.get('server.database');

const uri = `mongodb+srv://${dbUser}:${dbPwd}@cluster0.ykhmc.mongodb.net/?retryWrites=true&w=majority`;
const initializeDb = async () => {
	try {

		await mongoose.connect(uri, {
			dbName: dbName,
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
