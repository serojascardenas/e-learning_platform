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
		port: 8000,
		host: 'localhost',
	},
};