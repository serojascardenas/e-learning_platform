// eslint-disable-next-line import/no-anonymous-default-export
export default {
	app: {
		api: {
			host: process.env.API_HOST_URL ?? 'http://localhost:8000',
			routes: {
				login: 'api/auth/login',
				register: 'api/users',
				logout: 'api/auth/logout',
				courses: 'api/courses',
				courseById: 'api/courses/{id}',
			},
		},
	},
};
