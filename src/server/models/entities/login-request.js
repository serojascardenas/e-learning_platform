const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const loginRequestSchema = {
	$id: 'loginRequest',
	type: 'object',
	properties: {
		email: {
			type: 'string',
			nullable: false,
			format: 'email',
		},
		password: {
			type: 'string',
			nullable: false,
		},
	},
	required: ['email', 'password'],
	additionalProperties: false,
};

function validateSchema(model) {
	const ajv = new Ajv();
	addFormats(ajv);
	const validate = ajv.compile(loginRequestSchema);
	const isValid = validate(model);
	const { errors } = validate;
	return {
		isValid,
		errors,
	};
}

module.exports = validateSchema;