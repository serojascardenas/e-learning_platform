const { getOriginalUrlFromRequest } = require('../../utils/routes');

const logArrival = req => console.info(`❕❔Endpoint with path ${req.method} ${getOriginalUrlFromRequest(req)} does not exist.`);

module.exports = {
	logArrival,
};