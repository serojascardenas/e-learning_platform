import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import config from '../config';
import { get } from './core';

const API_HOST_ADDRESS = get(config, 'app.api.host') ?? 'http://127.0.0.1:8000';

const defaultErrorHandler = (error, { ...props }) => {
	const { response: { data: { statusCode } = {} } = {} } = error;

	let errorString = get(error, 'response.data', get(error, 'response', error));

	// errorString could be an HTML error. To avoid spreading a very long string,
	//    validate first if it's an actual HTML string.
	if (
		typeof errorString === 'string' &&
		errorString.indexOf('<!DOCTYPE html>') === 0
	) {
		errorString = { errorString };
	}

	return {
		error: error.toString(),
		statusCode,
		props,
		...errorString,
	};
};

const fetchComponentData = ({
	endpoint = '',
	settings = {},
	method = 'get',
	withCredentials = true,
	errorHandler = defaultErrorHandler,
	data,
	params,
}) => {
	const makeRequest = async ({
		url,
		data,
		requestId,
		req,
		res,
	}) => {
		console.log(`calling BE ${url}`);
		const request = await axios({
			url,
			data,
			method,
			timeout: 10000,
			params,
			headers: {
				'Content-Type': 'application/json',
				'X-Request-Id': requestId,
				...(req ? req.headers : undefined),
			},
			withCredentials: withCredentials,
		});

		return {
			...request.data,
			req,
			res,
			request,
			state: request.data.state,
		};
	};

	const fetcherFunction = async ({ req, res, ...props } = {}) => {
		const requestId = uuidv4();
		let url;

		try {
			if (res) res.set('X-Request-Id', requestId);

			const absUrl = API_HOST_ADDRESS;

			let parsedEndpoint = endpoint;
			let parsedSettings = settings;

			if (typeof parsedEndpoint === 'function') {
				parsedEndpoint = endpoint({ req, ...props });
			}

			if (typeof parsedSettings === 'function') {
				parsedSettings = settings({ req, ...props });
			} else {
				parsedSettings = { ...parsedSettings, ...props };
			}

			url = `${absUrl || ''}/${parsedEndpoint.replace(/^\//, '')}`;

			const requestInTransit = makeRequest({
				url,
				data,
				requestId,
				req,
				res,
				...parsedSettings,
			});

			return await requestInTransit;
		} catch (err) {
			const processedError = errorHandler(err, { req, res, ...props });
			// eslint-disable-next-line no-console
			console.error('Error on request', processedError);
			return processedError;
		}
	};

	return fetcherFunction();
};

const fetchData = async ({ endpoint = '' } = {}) => {
	const absUrl = API_HOST_ADDRESS;

	const response = await axios.get(`${absUrl}/${endpoint}`);
	return await response;
};

export { fetchComponentData, fetchData };
