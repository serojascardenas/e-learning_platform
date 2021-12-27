const nodemailer = require('nodemailer');

const config = require('../../utils/config-loader');

const { account, password, service } = config.get('app.services.email');
const { port, host } = config.get('server');

const hostUrl = `http://${host}:${port}`;

const transporter = nodemailer.createTransport({
	service,
	auth: {
		user: account,
		pass: password,
	},
});

const sendValidationEmail = async user => {
	const { id, email } = user;
	try {
		await transporter.sendMail({
			from: `TP Learn <${account}>`,
			to: email,
			subject: 'Welcome to TP Learn App',
			html: `
			<div>
				<h1>Welcome to TP learn App!</h1>
				<p>To continue, please activate your account!</p>
				<a href="${hostUrl}/api/users/${id}/activate">Activate Account</a>
			</div>
		`,
		});
		console.log(`Email sent to ${email}`);
	} catch (err) {
		console.log('Error sending email', err);
	}
};

module.exports = {
	sendValidationEmail,
};