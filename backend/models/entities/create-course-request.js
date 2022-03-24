const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const courseRequestSchema = {
	$id: 'createCourseRequest',
	type: 'object',
	properties: {
		title: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		instructors: {
			type: 'array',
			items: {
				type: 'string',
			},
		},
		cover_image: {
			type: 'string',
		},
		cover_movie: {
			type: 'string',
		},
		attributes: {
			type: 'object',
			properties: {
				video_content_length: {
					type: 'number',
				},
				num_articles: {
					type: 'number',
				},
				num_practice_tests: {
					type: 'number',
				},
				has_lifetime_access: {
					type: 'boolean',
				},
				has_assignments: {
					type: 'boolean',
				},
				has_certificate: {
					type: 'boolean',
				},
			},
		},
		category: {
			type: 'string',
		},
		sub_category: {
			type: 'string',
		},
		price: {
			type: 'object',
			properties: {
				amount: {
					type: 'number',
				},
				currency: {
					type: 'string',
				},
				currency_symbol: {
					type: 'string',
				},
				price_string: {
					type: 'string',
				},
				is_free: {
					type: 'boolean',
				},
			},
			required: [
				'amount',
				'currency',
				'currency_symbol',
			],
		},
		content_sections: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					title: {
						type: 'string',
					},
					order: {
						type: 'number',
					},
					items: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
								},
								video: {
									type: 'string',
								},
								order: {
									type: 'number',
								},
							},
							required: [
								'name',
								'order',
							],
						},
					},
				},
				required: [
					'title',
					'order',
					'items',
				],
			},
		},
	},
	required: [
		'price',
		'title',
		'description',
		'instructors',
		'cover_image',
		'category',
		'sub_category',
		'content_sections'],
	additionalProperties: false,
};

function validateSchema(model) {
	const ajv = new Ajv();
	addFormats(ajv);
	const validate = ajv.compile(courseRequestSchema);
	const isValid = validate(model);
	const { errors } = validate;
	return {
		isValid,
		errors,
	};
}

module.exports = validateSchema;