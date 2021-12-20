const { get } = require('./core');

const getOriginalUrlFromRequest = req => get(req, 'originalUrl');

module.exports = {
	getOriginalUrlFromRequest,
};