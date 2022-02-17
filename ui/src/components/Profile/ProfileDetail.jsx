import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Col,
	Row,
	Tabs,
	Tab,
	Form,
} from 'react-bootstrap';

import Message from '../../components/Message';
import { Button } from '../../components/Foundation';
import Courses from '../../components/Courses/Courses';

import { 
	updateProfile, 
	getMyEnrolledCourses, 
	getMyWishListCourses,
} from '../../actions';

const ProfileDetail = () => {
	const {
		userLogin: { userInfo },
		enrolledCourses,
		wishList,
	} = useSelector(state => state);

	const [name, setName] = useState(userInfo.name);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [email] = useState(userInfo.email);
	const [bio, setBio] = useState(userInfo.bio);
	const [avatar, setAvatar] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();
		const formData = new FormData();
		const body = { name, lastName };

		if (password) {
			// if(password !== confirmPassword)
			// let error = 'pws not equals';
			body.password = password;
		}
		if (bio) {
			body.bio = bio;
		}
		if (avatar) {
			formData.append('file_avatar', avatar[0]);
		}
		formData.append('body', JSON.stringify(body));
		// if (error) {
		// 	setMessage(error);
		// } else {
		dispatch(updateProfile(formData));
		// }
	};

	useEffect(() => {
		dispatch(getMyEnrolledCourses());
		dispatch(getMyWishListCourses());
	}, [dispatch]);


	return (
		<>
			{message && <Message variant='danger'>{message}</Message>}
			<Tabs id='profile-tab' defaultActiveKey='me' transition={false}  >
				<Tab eventKey='me' title='Mis datos'>
					<Form onSubmit={submitHandler}>
						<Row className='mb-4'>
							<Col>
								<Form.Group>
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type='name'
										value={name}
										required
										min='3'
										max='30'
										placeholder='Ingresa tu nombre'
										onChange={e => setName(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Apellido</Form.Label>
									<Form.Control
										type='name'
										value={lastName}
										required
										min='3'
										max='30'
										placeholder='Ingresa tu apellido'
										onChange={e => setLastName(e.target.value)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group className='mb-4'>
							<Form.Label>Correo Electrónico</Form.Label>
							<Form.Control
								type='email'
								plaintext
								readOnly
								defaultValue={email}
								required
								placeholder='Ingresa tu correo electrónico'
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Bio</Form.Label>
							<Form.Control
								as='textarea'
								maxLength={200}
								value={bio}
								placeholder='Ingresa tu mesage'
								onChange={e => setBio(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Avatar</Form.Label>
							<Form.Control
								type='file'
								placeholder='Ingresa tu imagem'
								onChange={e => setAvatar(e.target.files)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type='password'
								value={password}
								placeholder='Ingresa tu contraseña'
								onChange={e => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Confirmar Contraseña</Form.Label>
							<Form.Control
								type='password'
								value={confirmPassword}
								placeholder='Confirma tu contraseña'
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</Form.Group>
						<Button className='mt-4' type='submit' variant='primary'>
							Actualizar
						</Button>
					</Form>
				</Tab>
				<Tab eventKey='enrroled' title='Mis Cursos'>
					<Courses courses={ enrolledCourses.courses } />
				</Tab>
				<Tab eventKey='wish-list' title='Favoritos'>
					<Courses courses={ wishList.courses } />
				</Tab>
			</Tabs>
		</>
	);
};

export default ProfileDetail;
