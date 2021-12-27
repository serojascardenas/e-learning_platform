import get from 'lodash/get';

const isNumber = value => typeof value === 'number' && !Number.isNaN(value);

const identity = val => val;

export {
	isNumber,
	identity,
	get,
};