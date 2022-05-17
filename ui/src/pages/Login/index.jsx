import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';

import { login } from '../../actions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Button, H1 } from '../../components/Foundation';

const Login = ({
	location,
	history,
}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const dispatch = useDispatch();

	const { userLogin } = useSelector(state => state);
	const { loading, errors, userInfo } = userLogin;

	const query = new URLSearchParams(location.search);
	const redirect = query.get('redirect') ?? '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<H1>Iniciar Sesión</H1>
			{errors && <Message variant="danger">{errors}</Message>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Correo Electronico</Form.Label>
					<Form.Control
						type="email"
						value={email}
						placeholder="Ingresa tu Email"
						onChange={e => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mt-4" controlId="password">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type="password"
						value={password}
						placeholder="Ingresa tu contraseña"
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				{loading 
					? <Loader style={{ height: '2rem', width: '2rem', marginTop: '1rem' }}/> 
					: ( 
						<Button
							className="mt-4"
							type="submit"
							variant="primary"
						>Iniciar Sesión</Button>
					)}
			</Form>
			<Row  className="pt-3">
				<Col>
          ¿Aún no tienes cuenta? <Link to={redirect ? `register?redirect=${redirect}` : '/register'}>Crear Cuenta</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default Login;
