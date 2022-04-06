import get from 'lodash/get';

const isNumber = value => typeof value === 'number' && !Number.isNaN(value);

const isEmptyArray = arr => (!Array.isArray(arr)) || (Array.isArray(arr) && !arr.length);

const isEmptyObj = value => Object.keys(value).length === 0 && value.constructor === Object;

const identity = val => val;

export {
	isNumber,
	isEmptyArray,
	isEmptyObj,
	identity,
	get,
};