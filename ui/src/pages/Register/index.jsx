import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';

import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../actions';

import Form from '../../components/Form';

const Register = ({
	location,
	history,
}) => {

	const schema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		lastName: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		confirmPassword: Joi.ref('password'),
	});

	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const query = new URLSearchParams(location.search);
	const redirect = query.get('redirect') ?? '/';

	const dispatch = useDispatch();

	const { userRegister, userLogin } = useSelector(state => state);
	
	const { loading, error } = userRegister;
	const { userInfo } = userLogin;

	useEffect(() => {
		console.log(userInfo);
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		const { error } = Joi.validate({
			name,
			lastName,
			email,
			password,
			confirmPassword,
		},
		schema,
		{
			abortEarly: false,
		},
		);

		console.log(error);

		if (error) {
			let errors = error.details.reduce((acc, cur) => acc + cur.message + '. ', '');
			setMessage(errors);
		} else {
			dispatch(register({ name, lastName, email, password }));
		}
	};

	return (
		<Form>
			<Form.Title>Crear Cuenta</Form.Title>
			{message && <Form.Error>{message}</Form.Error>}
			{error && <Form.Error>{error}</Form.Error>}
			<Form.Base onSubmit={submitHandler}>
				<Form.Row>
					<Form.Input 
						placeholder="Nombre"
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
					<Form.Input 
						placeholder="Apellido"
						value={lastName}
						onChange={({ target }) => setLastName(target.value)}
					/>
				</Form.Row>
				<Form.Input 
					placeholder="Correo Electronico"
					type="email"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
				/>
				<Form.Input 
					placeholder="Contraseña"
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<Form.Input 
					placeholder="Confirmar Contraseña"
					type="password"
					value={confirmPassword}
					onChange={({ target }) => setConfirmPassword(target.value)}
				/>
				<Form.Submit
					variant="terciary"
					type="submit"
				>
					Crear Cuenta
				</Form.Submit>
			</Form.Base>
			<Form.Bottom>
				<Form.TextSmall>¿Ya tienes cuenta?</Form.TextSmall>
				<Form.Link to={redirect ? `login?redirect=${redirect}` : '/login'}>Iniciar Sesion</Form.Link>
			</Form.Bottom>
		</Form>
	);
};

export default Register;