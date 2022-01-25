const get = require('lodash/get');
const set = require('lodash/set');
const toTitleCase = require('titlecase');

const isEmptyArray = arr => (!Array.isArray(arr)) || (Array.isArray(arr) && !arr.length);

module.exports = {
	isEmptyArray,
	get,
	toTitleCase,
	set,
};