const { logArrival } = require('./helpers');

module.exports = function notFoundMiddleware(req, res) {
	logArrival(req);

	res.status(404).send('Route Not Found or Not Implemented');
};