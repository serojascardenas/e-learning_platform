module.exports = function userRoutes(routes, {
	middlewares,
}) {

	routes.get('/paypal',
		middlewares.validator(),
		middlewares.login.require,
		(_, res) => res.status(200).validJsonResponse(process.env.PAYPAL_CLIENT_ID),
	);

	routes.get('/stripe',
		middlewares.validator(),
		middlewares.login.require,
		(_, res) => res.status(200).validJsonResponse(process.env.PUBLISH_STRIPE_KEY),
	);

	return routes;
};