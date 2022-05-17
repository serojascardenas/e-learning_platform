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
		'sub_category'],
	additionalProperties: true,
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