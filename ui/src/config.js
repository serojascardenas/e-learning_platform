// eslint-disable-next-line import/no-anonymous-default-export
export default {
	app: {
		api: {
			host: process.env.API_HOST_URL ?? 'https://elearninglmd.herokuapp.com',
			routes: {
				login: 'api/auth/login',
				register: 'api/users',
				logout: 'api/auth/logout',
				courses: 'api/courses',
			},
		},
	},
};
