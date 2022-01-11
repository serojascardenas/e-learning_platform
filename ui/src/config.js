export default {
	app: {
		api: {
			host: process.env.API_HOST_URL ?? 'http://localhost:8000',
			routes: {
				login: 'api/auth/login',
				register: 'api/users',
				logout: 'api/auth/logout',
			},
		},
	},
};
