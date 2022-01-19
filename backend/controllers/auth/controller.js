const User = require('../../models/domain/user');

const loginUserAsync = async ({
	email,
	password,
}) => {
	const user = await User.findOne({ email, isActive: true });

	if (!user) throw new Error('Usuaro o Contraseña Inválido');

	const passwordMatch = await user.checkPassword(password);
	if (!passwordMatch) throw new Error('Usuario o Contraseña Inválido');

	return user;
};

module.exports = {
	loginUserAsync,
};