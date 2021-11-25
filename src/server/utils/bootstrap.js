const { resolve, join, relative } = require('path');
const { readdir, lstat } = require('fs-extra');
const { get, set, toTitleCase } = require('./core');

async function transverseDir(dir, root) {
	const rootPath = root || dir;
	let currentPaths;

	try {
		currentPaths = await readdir(dir);
		currentPaths = currentPaths.filter(path => path !== '__test__');
	} catch (err) {
		console.error(`Error getting path: ${dir}`, err.toString());
		console.trace(err);
	}

	let routes = [];

	if (!currentPaths.length) return routes;

	const filesAndDirs = (await Promise.all(
		currentPaths.map(path => lstat(resolve(dir, path))),
	)).map((stat, idx) => ({
		path: join(relative(rootPath, dir), currentPaths[idx]),
		isFile: stat.isFile(),
		isDir: stat.isDirectory(),
	}));

	routes = routes.concat(
		filesAndDirs
			.filter(stat => stat.isFile
				&& /\.m?js$/.test(stat.path))
			.map(({ path }) => path.replace(/\.js$/, '')),
	);

	const directoryFiles = (await Promise.all(
		filesAndDirs
			.filter(stat => stat.isDir)
			.map(stat => transverseDir(resolve(rootPath, stat.path), rootPath)),
	)).reduce((pathArr, next) => pathArr.concat(next), []);

	return routes
		.map(path => `${path.replace(/\/?index$/, '')}`)
		.concat(directoryFiles)
		.sort((a, b) => {
			const aLen = (a.match(/\//g) || []).length;
			const bLen = (b.match(/\//g) || []).length;

			if (aLen < bLen) return -1;

			if (aLen > bLen) return 1;

			if (aLen === bLen || a.length === b.length) return 0;

			return a > b ? -1 : 1;
		});
}

async function loadControllers(controllerDir) {
	const paths = await module.exports.transverseDir(controllerDir);
	const controllers = {};

	paths.forEach(path => {
		try {
			if (!/controller/.test(path)) return;
			const parsedPath = path
				.replace(/\//g, '.')
				.replace(/[.\-_]controller/g, '')
				.replace(/(-w)/g, m => m[1].toUpperCase());

			set(
				controllers,
				parsedPath,
				require(join(controllerDir, path)),
			);

			console.info('🎮 ', `Loaded controller "${toTitleCase(parsedPath)}"`);
		} catch (err) {
			console.trace(err);
			throw new Error(`Error processing controller: ${path} ${err.stack || err}`);
		}
	});

	return controllers;
}

async function loadServices(servicesDir) {
	const paths = await module.exports.transverseDir(servicesDir);
	const services = {};

	paths.forEach(path => {
		try {
			if (!/service/.test(path)) return;
			const parsedPath = path
				.replace(/\//g, '.')
				.replace(/[.\-_]service/g, '')
				.replace(/(-w)/g, m => m[1].toUpperCase());

			set(
				services,
				parsedPath,
				require(join(servicesDir, path)),
			);

			console.info('🖥  ', `Loaded service "${toTitleCase(parsedPath)}"`);
		} catch (err) {
			console.trace(err);
			throw new Error(`Error processing service: ${path} ${err.stack || err}`);
		}
	});

	return services;
}

async function loadMiddlewares(middlewaresDir, app, bootstrap) {
	// Allow method mocking for testing
	const paths = await module.exports.transverseDir(middlewaresDir);

	const middlewares = {};

	paths
		.sort()
		.forEach(path => {
			try {
				// remove the word 'middleware' from the path to avoid verbosity
				const parsedPath = path
					.replace(/^\d{1,}-/, '') // Remove numbered prefixes
					.replace(/\//g, '.')
					.replace(/[.\-_]middleware/g, '');

				const middleware = require(join(middlewaresDir, path));

				if (middleware.loadOnInit) {
					if (middleware.path) {
						app.use(middleware.path, middleware(bootstrap));
					} else if (Array.isArray(middleware.entries)) {
						middleware.entries.forEach(m => (m.path
							? app.use(
								typeof m.path === 'function' ? m.path(bootstrap) : m.path,
								m.handler(bootstrap),
							)
							: app.use(m(bootstrap))));
					} else {
						app.use(middleware(bootstrap));
					}

					console.info('📦 ', `Loaded global middleware "${parsedPath}"`);
				} else {
					if (parsedPath.startsWith('_') || parsedPath.includes('helpers')) {
						return;
					}

					set(
						middlewares,
						parsedPath,
						middleware,
					);
					console.info('📦 ', `Loaded middleware "${parsedPath}"`);
				}
			} catch (err) {
				console.trace(err);
				throw new Error(`Error processing middleware: ${path} ${err.stack || err}`);
			}
		});

	return middlewares;
}

async function loadRoutes(
	router,
	// eslint-disable-next-line no-undef
	routeDir = join(process.cwd(), 'routes'),
	bootstrap = {
		controllers: {},
		middlewares: {},
		entities: {},
		express: {},
		app: {},
	},
) {
	// Allow method mocking for testing
	const paths = await module.exports.transverseDir(routeDir);
	// this avoids conflicts with string keys.
	const ROUTER_SYMBOL = Symbol('router');
	// this is a dictionary to check if a path has been already processed.
	const routers = { [ROUTER_SYMBOL]: router };

	paths.forEach(path => {
		if (path.startsWith('_types')) {
			return;
		}

		try {
			const routeHandler = require(join(routeDir, path));
			const route = `/${path.replace(/^\//, '')}`;

			if (typeof routeHandler !== 'function') return;

			let ancestorRouterKeys = route.slice(1).split('/');
			let ancestorRouter = null;
			let routeKeys = [];

			// Gets the closest ancestor router
			do {
				routeKeys = [...ancestorRouterKeys.slice(-1), ...routeKeys];
				ancestorRouterKeys = ancestorRouterKeys.slice(0, -1);
				ancestorRouter = (
					ancestorRouterKeys.length === 0
						? routers // defaults to the root object
						: get(routers, ancestorRouterKeys.join('.'))
				);
			} while (!ancestorRouter);

			// ensures there is a router handler for this path
			const nestedRouterHandler = routeHandler.name === 'router'
				? routeHandler : routeHandler(
					bootstrap.express.Router && bootstrap.express.Router(),
					bootstrap,
				);

			const nestedRoute = `/${routeKeys.join('/')}`;

			// assigns the subpath to the closest ancestor without leading '/'
			ancestorRouter[nestedRoute.slice(1)] = { [ROUTER_SYMBOL]: nestedRouterHandler };
			ancestorRouter[ROUTER_SYMBOL].use(nestedRoute, nestedRouterHandler);

			console.info('🌐 ', `Mapped {${route}} route`);
		} catch (err) {
			console.trace(err);
			throw new Error(`Error processing route: ${path} ${err.stack || err}`);
		}
	});

	return router;
}

module.exports = {
	loadControllers,
	loadServices,
	loadMiddlewares,
	loadRoutes,
	transverseDir,
};