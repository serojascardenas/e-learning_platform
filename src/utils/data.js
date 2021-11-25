import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
	identity, get,
} from './core';

const LOCAL_HOST_ADDRESS = '127.0.0.1';

const getServerOrigin = req => req && `${req.protocol}://${req.localhost || req.get('host') || LOCAL_HOST_ADDRESS}`;

const defaultErrorHandler = (error, { req, res, ...props }) => {
	const {
		response: {
			data: {
				statusCode,
			} = {},
		} = {},
	} = error;

	let errorString = get(error, 'response.data', get(error, 'response', error));

	// errorString could be an HTML error. To avoid spreading a very long string,
	//    validate first if it's an actual HTML string.
	if (typeof errorString === 'string' && errorString.indexOf('<!DOCTYPE html>') === 0) {
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
	mapper = identity,
	errorHandler = defaultErrorHandler,
}) => {
	const makeRequest = async ({
		url, requestId, req, res, ...parsedSettings
	}) => {
		const request = await axios({
			url,
			method,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json',
				'X-Request-Id': requestId,
				...(req ? req.headers : undefined),
			},
			...parsedSettings,
		});

		return {
			...mapper({
				...request.data, parsedSettings, req, res,
			}, request),
			state: request.data.state,
		};
	};

	const fetcherFunction = async ({ req, res, ...props } = {}) => {
		const requestId = uuidv4();
		let url;

		try {
			if (res) res.set('X-Request-Id', requestId);

			const absUrl = getServerOrigin(req);

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
				url, requestId, req, res, ...parsedSettings,
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

export {
	fetchComponentData,
};