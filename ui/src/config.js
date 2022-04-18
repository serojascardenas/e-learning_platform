// eslint-disable-next-line import/no-anonymous-default-export
export default {
	app: {
		api: {
			host: process.env.API_HOST_URL ?? 'http://localhost:8000',
			routes: {
				login: 'api/auth/login',
				register: 'api/users',
				userDetails: 'api/users/{id}',
				me: {
					update: 'api/users',
					enrolledCurses: 'api/courses/me/enrolled-courses',
					wishList: 'api/courses/me/wish-list',
					instructorList: 'api/courses/me/instructor-list',
				},
				logout: 'api/auth/logout',
				topCourses: 'api/courses/top',
				courses: 'api/courses',
				updateCourse:'api/courses/{id}', 
				courseById: 'api/courses/{id}',
				removeCourseById: 'api/courses/{id}',
				createOrder: 'api/orders',
				getOrderDetails: 'api/orders/{id}',
				payOrder: 'api/orders/{id}/pay',
				getMyOrders: 'api/orders/my-orders',
				paymentProviders: {
					paypal: 'api/configs/paypal',
					stripe: 'api/configs/stripe',
				},
			},
		},
	},
};
