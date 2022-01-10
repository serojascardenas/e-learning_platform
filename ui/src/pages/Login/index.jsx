import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions';

import Form from '../../components/Form';

const Login = ({
	location,
	history,
}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
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
		<Form>
			<Form.Title>Iniciar Sesion</Form.Title>
			{errors && <Form.Error>{errors}</Form.Error>}
			<Form.Base onSubmit={submitHandler}>
				<Form.Input
					placeholder="Correo Electronico"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
				/>
				<Form.Input 
					placeholder="Contraseña"
					type="password"
					autoComplete="off"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<Form.Submit
					variant="terciary"
					type="submit"
				>
					Iniciar Sesión
				</Form.Submit>
			</Form.Base>
			<Form.Bottom>
				<Form.TextSmall>¿Aún no tienes cuenta?</Form.TextSmall>
				<Form.Link to="/register">Crear Cuenta</Form.Link>
			</Form.Bottom>
		</Form>
	);
};

export default Login;
