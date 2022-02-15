import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container as BaseContainer,
	Col,
	Row,
	Tabs,
	Tab,
	Form
} from 'react-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import { Button } from '../../components/Foundation';
import Courses from '../../components/Courses/Courses';

import { register, listCourses, listFilterCourses } from '../../actions';

const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
	padding: 4rem;
`;

const Profile = () => {
	const {
		userLogin: { userInfo },
		courseList,
		filteredCourseList
	} = useSelector(state => state);

	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(30)
			.required(),
		lastName: Joi.string()
			.min(3)
			.max(30)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
		confirmPassword: Joi.ref('password')
	});

	const [name, setName] = useState(userInfo.name);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [email, setEmail] = useState(userInfo.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const { courses, loading, errors } = courseList;
	const {
		filteredCourses,
		loading: loadingFiltered,
		errors: errorsFiltered
	} = filteredCourseList;

	useEffect(() => {
		dispatch(listCourses());
	}, [dispatch]);

	const onFilterSubmit = filters => {
		dispatch(listFilterCourses(filters));
	};

	const submitHandler = e => {
		e.preventDefault();
		const { error } = Joi.validate(
			{
				name,
				lastName,
				email,
				password,
				confirmPassword
			},
			schema,
			{
				abortEarly: false
			}
		);

		if (error) {
			let errors = error.details.reduce(
				(acc, cur) => acc + cur.message + '. ',
				''
			);
			setMessage(errors);
		} else {
			dispatch(register({ name, lastName, email, password }));
		}
	};

	return (
		<Container fluid>
			{loading ? (
				<Loader />
			) : errors ? (
				<Message>{errors}</Message>
			) : (
				<>
					<Row>
						<Col md={12} xs={12} lg={3} className="my-4">
							<ProfileInfo />
						</Col>
						<Col md={12} xs={12} lg={9} className="my-4">
							{/* ProfileDetail */}
							<Tabs defaultActiveKey="me" transition={false} id="profile-tab">
								<Tab eventKey="me" title="Mis datos">
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
										<Button className="mt-4" type="submit" variant="primary">
											Registrarse
										</Button>
									</Form>
								</Tab>
								<Tab eventKey="enrroled" title="Mis Cursos">
									<Courses courses={courses} />
								</Tab>
								<Tab eventKey="wish-list" title="Favoritos">
									<Courses courses={courses} />
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Profile;
