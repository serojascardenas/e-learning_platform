import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import { Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';


import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions';
import { Button, H1 } from '../../components/Foundation';

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

	const { userRegister } = useSelector(state => state);
	
	const { userInfo, loading, error } = userRegister;

	useEffect(() => {
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

		if (error) {
			let errors = error.details.reduce((acc, cur) => acc + cur.message + '. ', '');
			setMessage(errors);
		} else {
			dispatch(register({ name, lastName, email, password }));
		}
	};

	return (
		<FormContainer>
			<H1>Crear Cuenta</H1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader /> }
			<Form onSubmit={submitHandler}>
				<Row className="mb-4">
					<Col>
						<Form.Group>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="name"
								value={name}
								required
								placeholder="Ingresa tu nombre"
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type="name"
								value={lastName}
								required
								placeholder="Ingresa tu apellido"
								onChange={e => setLastName(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group className="mb-4">
					<Form.Label>Correo Electrónico</Form.Label>
					<Form.Control
						type="email"
						value={email}
						required
						placeholder="Ingresa tu correo electrónico"
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-4">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type="password"
						value={password}
						required
						placeholder="Ingresa tu contraseña"
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirmar Contraseña</Form.Label>
					<Form.Control
						type="password"
						value={confirmPassword}
						required
						placeholder="Confirma tu contraseña"
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button
					className="mt-4"
					type="submit"
					variant="primary"
				>Registrarse</Button>
			</Form>
			<Row  className="pt-3">
				<Col>
          ¿Ya tienes cuenta? <Link to={redirect ? `login?redirect=${redirect}` : '/login'}>Iniciar Sesión</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default Register;