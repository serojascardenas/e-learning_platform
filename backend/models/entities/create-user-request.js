const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const userRequestSchema = {
	$id: 'createUserRequest',
	type: 'object',
	properties: {
		name: {
			type: 'string',
			nullable: false,
		},
		lastName: {
			type: 'string',
			nullable: false,
		},
		email: {
			type: 'string',
			nullable: false,
			format: 'email',
		},
		password: {
			type: 'string',
			nullable: false,
		},
		bio: {
			type: 'string',
			nullable: true,
		},
		avatar: {
			type: 'string',
		},
	},
	required: ['name', 'lastName', 'email', 'password'],
	additionalProperties: false,
};

function validateSchema(model) {
	const ajv = new Ajv();
	addFormats(ajv);
	const validate = ajv.compile(userRequestSchema);
	const isValid = validate(model);
	const { errors } = validate;
	return {
		isValid,
		errors,
	};
}

module.exports = validateSchema;