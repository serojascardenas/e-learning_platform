/* eslint-disable no-undef */
const express = require('express');
const set = require('lodash/set');
const { resolve } = require('path');
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');

const { initializeDb, mongoose } = require('./data/dataContext');

const {
	loadControllers,
	loadServices,
	loadMiddlewares,
	loadRoutes,
} = require('./utils/bootstrap');

const config = require('./utils/config-loader');
const session = require('./utils/session');

const endpointNotFoundMiddleware = require('./middlewares/endpoint-not-found');

const { port, host } = config.get('server');

async function init() {
	console.info('Starting API');

	const expressApp = express();

	console.info(
		`⚙️ Loading config from: "${config.util.getEnv('NODE_CONFIG_ENV')}"`
	);

	await initializeDb();
	const bootstrap = {
		express,
		app: expressApp,
		config,
		controllers: await loadControllers(resolve(__dirname, './controllers')),
		services: await loadServices(resolve(__dirname, './services')),
		setConfig(field, newValue) {
			set(bootstrap.config, field, newValue);
		},
	};

	bootstrap.middlewares = await loadMiddlewares(
		resolve(__dirname, './middlewares'),
		expressApp,
		bootstrap
	);
	const routes = await loadRoutes(
		express.Router(),
		resolve(__dirname, './routes'),
		bootstrap
	);

	expressApp.use(express.json());
	expressApp.use(session);
	expressApp.use(
		cors({
			credentials: true,
			methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
			origin: ['http://localhost:3000', 'http://localhost:8000'],
		})
	);
	expressApp.use('/api', routes);
	expressApp.use('/*', endpointNotFoundMiddleware);

	expressApp.use((error, req, res) => {
		if (error instanceof mongoose.Error.ValidationError) {
			error = createError(400, error);
		} else if (
			error instanceof mongoose.Error.CastError &&
			error.message.includes('_id')
		) {
			error = createError(404, 'Resource not found');
		} else if (error.message.includes('E11000')) {
			error = createError(409, 'Duplicated');
		}

		res.status(error?.status || 500);
		res.json({
			error: {
				message: error.message,
				statusCode: error.status,
			},
		});
	});

	console.info('-- Dependencies initialized --');

	if (process.env.NODE_ENV === 'production') {
		expressApp.use(express.static(path.join(__dirname, '../../build')));

		expressApp.get('*', (_, res) =>
			res.sendFile(resolve(__dirname, '..', '..', 'build', 'index.html'))
		);
	} else {
		expressApp.get('/', (_, res) => {
			res.send(`API is running on port ${port}...`);
		});
	}

	const server = expressApp.listen(port, host, err => {
		if (err) throw err;

		const { address } = server.address();

		expressApp.serverInstance = server;

		const hostUrl = `http://${address}:${port}`;

		console.info('✅ API started successfully');
		console.info(`API is running on ${hostUrl}`);

		const gracefulExit = () => {
			console.log('🚪 Manual shutdown, closing server...');
			server.close();
		};

		process.on('SIGTERM', gracefulExit);
		process.on('SIGINT', gracefulExit);
	});
}

const handleGlobalError = err => {
	console.error('🚨 Uncaught Error:', err.toString());
	console.trace(err);
};

process.on('uncaughtException', handleGlobalError);
process.on('unhandledRejection', handleGlobalError);
init();
