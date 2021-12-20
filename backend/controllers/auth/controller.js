const User = require('../../models/domain/user');

const loginUserAsync = async ({
	email,
	password,
}) => {
	const user = await User.findOne({ email, isActive: true });

	if (!user) throw new Error('Invalid Username Or Password');

	const passwordMatch = await user.checkPassword(password);
	if (!passwordMatch) throw new Error('Invalid Username Or Password');

	return user;
};

module.exports = {
	loginUserAsync,
};