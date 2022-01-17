/* eslint-disable no-undef */
module.exports = {
	app: {
		session: {
			maxAge: 60 * 60 * 24 * 7,
			secret: process.env.APP_SESSION_SECRET,
			secure: false,
		},
		services: {
			email: {
				account: process.env.EMAIL_ACCOUNT,
				password: process.env.EMAIL_PASSWORD,
				service: 'Gmail',
			},
		},
	},
	server: {
		port: process.env.PORT || 8000,
		host: process.env.SERVER_HOST || 'localhost',
		database: {
			dbUser: process.env.DB_USER,
			dbPwd: process.env.DB_PWD,
			dbName: process.env.DB_NAME,
		},
	},
};