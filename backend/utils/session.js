const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const get = require('lodash/get');

const config = require('./config-loader');

const sessionConfig = config.get('app.session');

const SESSION_MAX_AGE_SECONDS = get(sessionConfig, 'maxAge');
const SESSION_SECURE = get(sessionConfig, 'secure');
// eslint-disable-next-line no-undef
const SESSION_SECRET = get(sessionConfig, 'secret') ?? process.env.APP_SESSION_SECRET;

module.exports = session({
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: {
		sameSite: false,
		secure: SESSION_SECURE,
		maxAge: SESSION_MAX_AGE_SECONDS * 1000,
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: SESSION_MAX_AGE_SECONDS,
	}),
});
