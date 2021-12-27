/* eslint-disable no-undef */
const { resolve } = require('path');
const dotenv = require('dotenv');

dotenv.config({
	path: resolve(__dirname, '../../.env'),
});

process.env = {
	...process.env,
	...({
		NODE_CONFIG_DIR: process.env.NODE_CONFIG_DIR || resolve(__dirname, '../config'),
	}),
};

const config = require('config');

module.exports = config;