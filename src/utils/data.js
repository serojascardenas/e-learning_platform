import axios from 'axios';

axios.interceptors.response.use(null, error => {
	const authError = error.response && error.response.status === 401;

	// remove user from local storage if there is a unnauthorized response and the user exists
	if (authError) {
		if (localStorage.getItem('user')) {
			localStorage.removeItem('user');
		}
		return Promise.reject(error);
	}
});

const errorHandler = (error, { req, res, ...props }) => {
	const {
		response: {
			data: {
				statusCode,
			} = {},
		} = {},
	} = error;

	return {
		error: error.toString(),
		statusCode,
		props,
	};
};


const getComponentData = ({
	endpoint = '',
	settings = {},
	method = 'get',
}) => {

	const makeRequest = async ({
		url,
		req,
		res,
		...parsedSettings
	}) => {
		const request = await axios({
			url,
			method,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				...(req ? req.headers : undefined),
			},
			...parsedSettings,
		});

		return {
			data: request.data,
			statusCode: request.status,
		};
	};

	const fetcherFunction = async ({ req, res, ...props } = {}) => {
		const baseUrl = process.env.REACT_APP_BASE_URL;
		const url = `${baseUrl}/${endpoint}`;

		try {
			let parsedSettings = settings;
			if (typeof parsedSettings === 'function') {
				parsedSettings = settings({ req, ...props });
			} else {
				parsedSettings = { ...parsedSettings, ...props };
			}

			return await makeRequest({ url, req, res, ...parsedSettings });
		} catch (err) {
			console.log(err);
			const processedError = errorHandler(err, { req, res, ...props });
			console.error('Error on request', processedError);
			return processedError;
		}
	};

	return fetcherFunction();
};

export {
	getComponentData,
};