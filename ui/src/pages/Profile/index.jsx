import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	Container as BaseContainer,
	Col,
	Row,
	Card,
	Form,
	Tab,
	Tabs,
} from 'react-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button } from '../../components/Foundation';
import Courses from '../../components/Courses/Courses';
import CoursesList from '../../components/Courses/CoursesList';

import { isEmptyArray } from '../../utils';

import {
	updateProfile,
	getMyEnrolledCourses,
	getMyWishListCourses,
	getMyCreatedCourses,
	getUserDetails,
} from '../../actions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants';

const TabWrapper = styled.section`
	margin-top: 2rem;
`;

const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
`;

const Profile = ({ history }) => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isInstructor, setIsInstructor] = useState(false);
	const [email, setEmail] = useState('');
	const [bio, setBio] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [avatarImg, setAvatarImg] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const {
		userLogin,
		userUpdateProfile,
		userDetails,
		enrolledCourses,
		wishList,
		isntructorList,
	} = useSelector(state => state);

	const { courses: boughtCourses, loading: loadingEnrolled } = enrolledCourses;

	const { courses: likedCourses, loading: loadingWishList } = wishList;

	const { courses: createdCourses, loading: loadingCreated } = isntructorList;

	const { userInfo } = userLogin;
	const { success } = userUpdateProfile;
	const { user } = userDetails;

	const submitHandler = e => {
		e.preventDefault();
		let error = false;
		const formData = new FormData();
		const body = { name, lastName };

		if (password != null && password !== '' && confirmPassword != null) {
			if (password === confirmPassword) {
				body.password = password;
			} else {
				error = true;
				setMessage('Password not match!');
			}
		}
		if (bio) {
			body.bio = bio;
		}
		if (avatar) {
			formData.append('file_avatar', avatar[0]);
		}

		formData.append('body', JSON.stringify(body));

		if (!error) {
			setLoading(true);
			dispatch(updateProfile(formData));

			if (!userUpdateProfile?.errors) {
				setLoading(false);
			}
		}
	};

	const onChangeAvatar = e => {
		setAvatar(e.target.files[0]);
		setAvatarImg(URL.createObjectURL(e.target.files[0]));
	};

	const handleSelectedTabs = async key => {
		switch (key) {
			case 'enrroled':
				dispatch(getMyEnrolledCourses());
				break;
			case 'wish-list':
				dispatch(getMyWishListCourses());
				break;
			case 'instructor-list':
				dispatch(getMyCreatedCourses());
				break;
			default:
		}
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		} else {
			if (!user?.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
			} else {
				setName(userInfo.name);
				setLastName(userInfo.lastName);
				setEmail(userInfo.email);
				setBio(userInfo.bio);
				setIsInstructor(userInfo.isInstructor);
				setAvatar(userInfo.avatar);
				setAvatarImg(userInfo.avatar);
			}
		}
	}, [dispatch, userInfo, success, history, user]);

	return (
		<Container className="mt-4">
			{message && <Message variant="danger">{message}</Message>}
			{loading ? <Loader /> : <></>}
			<Row>
				<Col md={12} xs={12} lg={4} xl={3} className="my-4">
					<Card style={{ width: '15rem' }}>
						<Card.Img variant="top" src={avatarImg ?? '/images/avatar.png'} />
						<Card.Body>
							<Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>
								{name} {lastName}
							</Card.Title>
							{bio && <Card.Text>{bio}</Card.Text>}
						</Card.Body>
					</Card>
				</Col>
				<Col className="my-4">
					
					<Tabs
						id="profile-tab"
						defaultActiveKey="me"
						transition={false}
						className="w-100"
						onSelect={e => handleSelectedTabs(e)}
					>
						<Tab
							eventKey="me"
							title="Mis datos"
							className="p-4 align-middle border"
						>
							<TabWrapper>
								<Form onSubmit={submitHandler}>
									<Row className="mb-4">
										<Col>
											<Form.Group>
												<Form.Label>Nombre</Form.Label>
												<Form.Control
													type="name"
													value={name}
													required
													min="3"
													max="30"
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
													min="3"
													max="30"
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
											plaintext
											readOnly
											defaultValue={email}
											required
											placeholder="Ingresa tu correo electrónico"
										/>
									</Form.Group>
									<Form.Group className="mb-4">
										<Form.Label>Bio</Form.Label>
										<Form.Control
											as="textarea"
											maxLength={200}
											value={bio}
											placeholder="Agrega tu descripción"
											onChange={e => setBio(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className="mb-4">
										<Form.Label>Avatar</Form.Label>
										<Form.Control
											type="file"
											placeholder="Agrega una imagen"
											onChange={e => onChangeAvatar(e)}
										/>
									</Form.Group>
									<Form.Group className="mb-4">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type="password"
											value={password}
											placeholder="Ingresa nueva contraseña"
											onChange={e => setPassword(e.target.value)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Confirmar Contraseña</Form.Label>
										<Form.Control
											type="password"
											value={confirmPassword}
											placeholder="Confirma nueva contraseña"
											onChange={e => setConfirmPassword(e.target.value)}
										/>
									</Form.Group>
									<Button className="mt-4" type="submit" variant="primary">
										Actualizar
									</Button>
								</Form>
							</TabWrapper>
						</Tab>
						<Tab eventKey="enrroled" title="Mis Cursos">
							<TabWrapper>
								{loadingEnrolled ? (
									<Loader />
								) : isEmptyArray(boughtCourses) ? (
									<Message variant="info">
										No estás enrolado en ningún curso aún
									</Message>
								) : (
									<Courses showActionButtons={false} courses={boughtCourses} />
								)}
							</TabWrapper>
						</Tab>
						<Tab eventKey="wish-list" title="Favoritos">
							<TabWrapper>
								{loadingWishList ? (
									<Loader />
								) : isEmptyArray(likedCourses) ? (
									<Message variant="info">
										No tienes ningún favorito aún
									</Message>
								) : (
									<Courses courses={likedCourses} />
								)}
							</TabWrapper>
						</Tab>
						{isInstructor && (
							<Tab eventKey="instructor-list" title="Cursos Creados">
								<TabWrapper>
									{loadingCreated ? (
										<Loader />
									) : isEmptyArray(createdCourses) ? (
										<Message variant="info">No tienes ningún curso aún</Message>
									) : (
										<CoursesList courses={createdCourses} />
									)}
									<Container className="mt-4">
										<Row>
											<Col></Col>
											<Col md={3}>
												<Link to="/add-course">
													<Button>Nuevo Curso</Button>
												</Link>
											</Col>
										</Row>
									</Container>
								</TabWrapper>
							</Tab>
						)}
					</Tabs>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
