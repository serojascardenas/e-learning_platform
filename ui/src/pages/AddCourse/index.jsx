import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Joi from 'joi-browser';
import { Col, Row, Form, Tab, Nav, Container, Card } from 'react-bootstrap';

import Message from '../../components/Message';
import { Button, H1 } from '../../components/Foundation';
import Switch from '../../components/Switch';
import { createCourse } from '../../actions';
import Section from '../../components/Section/Section';

import { isEmptyArray } from '../../utils';
import { currencyType as listOfCurrencies } from './currencyType';
import { category as listOfCategories } from './category';
import { subCategory as listOfSubcategories } from './subCategory';
import Empty from '../../assets/images/empty.png';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const CreateCourse = ({ history }) => {
	const dispatch = useDispatch();
	const { userLogin } = useSelector(state => state);
	const { courseCreateDetails } = useSelector(state => state);
	const { userInfo, error } = userLogin;

	const Icon = styled.div`
		cursor: pointer;
		width: 25%;
		height: 100%;
		color: ${({ theme }) => theme.colors.turquoise};
		text-align: center;
		font-size: 3em;
		&:hover {
			filter: brightness(120%);
		}
	`;

	const schema = Joi.object({
		title: Joi.string()
			.min(5)
			.max(300)
			.required(),
		description: Joi.string()
			.min(3)
			.required(),
		category: Joi.string(),
		subCategory: Joi.string(),
		amount: Joi.number().precision(2),
		coverImage: Joi.any(),
		coverMovie: Joi.any(),
		attribute: Joi.object({
			videoContentLength: Joi.number(),
			numArticles: Joi.number(),
			numPracticeTests: Joi.number(),
			hasLifetimeAccess: Joi.boolean(),
			hasCertificate: Joi.boolean(),
		}).required(),
		content_sections: Joi.array().items(
			Joi.object({
				id: Joi.any(),
				title: Joi.string().required(),
				order: Joi.number().required(),
				items: Joi.array().items(
					Joi.object({
						id: Joi.any(),
						name: Joi.string().required(),
						video: Joi.any(),
						order: Joi.number().required(),
					})
				),
			})
		),
	});

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [currencySymbol, setCurrencySymbol] = useState('');
	const [currency, setCurrency] = useState('');
	const [amount, setAmount] = useState('');
	const [coverImage, setCoverImage] = useState('');
	const [coverMovie, setCoverMovie] = useState('');
	const [coverImageUrl, setCoverImageUrl] = useState(null);
	const [videoContentLength, setVideoContentLength] = useState('');
	const [numArticles, setNumArticles] = useState('');
	const [numPracticeTests, setNumPracticeTests] = useState('');
	const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);
	const [hasCertificate, setHasCertificate] = useState(false);
	const [message, setMessage] = useState(null);
	const [messageVariant, setMessageVariant] = useState('danger');
	const [disable, setDisable] = useState(false);

	const [sections, setSections] = useState([]);

	const submitHandler = e => {
		e.preventDefault();

		const { error } = Joi.validate(
			{
				title,
				description,
				category,
				subCategory,
				amount,
				coverImage,
				coverMovie,
				attribute: {
					videoContentLength,
					numArticles,
					numPracticeTests,
					hasLifetimeAccess,
					hasCertificate,
				},
				content_sections: sections,
			},
			schema,
			{
				abortEarly: false,
			}
		);

		if (error) {
			let errors = error.details.reduce(
				(acc, cur) => acc + cur.message + '. ',
				''
			);
			setMessages('danger', errors);
			setTimeout(() => unsetMessages(), 5000);
		} else {
			setDisable(true);

			const formData = new FormData();
			const instructors = [];
			instructors.push(userInfo.id);
			formData.append(
				'body',
				JSON.stringify({
					title,
					description,
					category,
					sub_category: subCategory,
					price: {
						amount: amount,
						currency: currency,
						currency_symbol: currencySymbol,
					},
					attributes: {
						video_content_length: parseInt(videoContentLength),
						num_articles: parseInt(numArticles),
						num_practice_tests: parseInt(numPracticeTests),
						has_lifetime_access: hasLifetimeAccess,
						has_certificate: hasCertificate,
					},
					content_sections: sections,
					instructors,
				})
			);
			if (coverImage) {
				formData.append('cover_image', coverImage[0]);
			}
			if (coverMovie) {
				formData.append('cover_movie', coverImage[0]);
			}

			dispatch(createCourse(formData));

			if (courseCreateDetails?.errors) {
				let errors = courseCreateDetails.errors.reduce(
					(acc, cur) => acc + cur.message + '. ',
					''
				);
				setMessages('danger', errors);
				setTimeout(() => unsetMessages(), 3000);
			} else {
				setMessages('info', 'Curso creado exitosamente!');
				setTimeout(() => {
					unsetMessages();
					history.push('/profile');
				}, 3000);
			}
		}
	};
	const onChangeCurrency = async e => {
		let arr = e.split('-');
		setCurrency(arr[0].trim());
		setCurrencySymbol(arr[1].trim());
	};

	const onChangeCoverImage = async e => {
		setCoverImage(e.target.files);
		setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
	};

	const unsetMessages = () => {
		setMessage(null);
	};

	const setMessages = (type, message) => {
		setMessageVariant(type);
		setMessage(message);
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		} else {
			//
		}
	}, [userInfo, history]);
	return (
		<Container className="mt-4">
			<Row>
				<Col md={1} lg={1} xs={1}>
					<Icon onClick={() => history.goBack()}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</Icon>
				</Col>
				<Col md={11} lg={11} xs={11}>
					<H1> Crear Curso </H1>
				</Col>
			</Row>
			<Row>
				<Container className="mt-2">
					{message && <Message variant={messageVariant}>{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
				</Container>
			</Row>
			<Row>
				<Col md={12}>
					<Tab.Container id="addCourse" defaultActiveKey="first">
						<Row>
							<Col md={3}>
								<Nav variant="tabs" className="flex-column m-0 p-0">
									<Nav.Item>
										<Nav.Link eventKey="first">INFORMACIÓN BÁSICA</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">DETALLES</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">SECCIONES</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<Container className="pt-4 border">
											<Form onSubmit={submitHandler}>
												<Form.Group className="mb-4">
													<Form.Label>Título</Form.Label>
													<Form.Control
														value={title}
														required
														min="5"
														max="300"
														placeholder="Ingresa el título"
														onChange={e => setTitle(e.target.value)}
														disabled={disable}
													/>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Label>Descripción</Form.Label>
													<Form.Control
														as="textarea"
														value={description}
														required
														rows={3}
														placeholder="Ingresa la descripción"
														onChange={e => setDescription(e.target.value)}
														disabled={disable}
													/>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Control
														as="select"
														value={category}
														required
														onChange={e => setCategory(e.target.value)}
														disabled={disable}
													>
														<option>Categoria</option>
														{listOfCategories ||
														!isEmptyArray(listOfCategories) ? (
															listOfCategories.map((item, i) => (
																<option key={i} value={item.value}>
																	{item.label}
																</option>
															))
														) : (
															<></>
														)}
													</Form.Control>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Control
														as="select"
														value={subCategory}
														required
														onChange={e => setSubCategory(e.target.value)}
														disabled={disable}
													>
														<option>Sub Categoria</option>
														{listOfSubcategories ||
														!isEmptyArray(listOfSubcategories) ? (
															listOfSubcategories.map((item, i) => (
																<option key={i} value={item.value}>
																	{item.label}
																</option>
															))
														) : (
															<></>
														)}
													</Form.Control>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Label>Portada del curso</Form.Label>
													<Form.Control
														type="file"
														onChange={e => onChangeCoverImage(e)}
														disabled={disable}
													/>
													<Card.Img
														variant="top"
														src={coverImageUrl ? coverImageUrl : Empty}
														style={{ height: '15rem', width: '15rem' }}
													/>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Label>Video de demostración</Form.Label>
													<Form.Control
														type="file"
														onChange={e => setCoverMovie(e.target.files)}
														disabled={disable}
													/>
												</Form.Group>
											</Form>
										</Container>
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<Container className="pt-4 border">
											<Form>
												<Form.Group className="mb-4">
													<Form.Label>Precio</Form.Label>
													<Row>
														<Col>
															<Form.Control
																as="select"
																required
																onChange={e => onChangeCurrency(e.target.value)}
																disabled={disable}
															>
																<option>Moneda</option>
																{listOfCurrencies ||
																!isEmptyArray(listOfCurrencies) ? (
																	listOfCurrencies.map((item, j) => (
																		<option
																			key={j}
																			value={`${item.id} - ${item.symbol}`}
																		>{`${item.label} (${item.symbol})`}</option>
																	))
																) : (
																	<></>
																)}
															</Form.Control>
														</Col>
														<Col>
															<Form.Control
																type="number"
																step={'any'}
																value={amount}
																required
																placeholder="0.00"
																onChange={e => setAmount(e.target.value)}
																disabled={disable}
															/>
														</Col>
													</Row>
												</Form.Group>
												<Form.Group className="mb-4">
													<Row>
														<Col>
															<Switch
																handleChange={e =>
																	setHasLifetimeAccess(e.target.checked)
																}
																id="hasLifetimeAccessId"
																value={hasLifetimeAccess}
															>
																Tiene acceso ilimitado?
															</Switch>
														</Col>
														<Col>
															<Switch
																handleChange={e =>
																	setHasCertificate(e.target.checked)
																}
																id="hasCertificateId"
																value={hasCertificate}
																disabled={disable}
															>
																Tiene Certificado?
															</Switch>
														</Col>
													</Row>
												</Form.Group>

												<Form.Group className="mb-4">
													<Form.Label>Cantidad de horas del curso</Form.Label>
													<Form.Control
														type="number"
														value={videoContentLength}
														onChange={e =>
															setVideoContentLength(e.target.value)
														}
														disabled={disable}
													/>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Label>Cantidad de artículos</Form.Label>
													<Form.Control
														type="number"
														value={numArticles}
														onChange={e => setNumArticles(e.target.value)}
														disabled={disable}
													/>
												</Form.Group>
												<Form.Group className="mb-4">
													<Form.Label>Cantidad de actividades</Form.Label>
													<Form.Control
														type="number"
														value={numPracticeTests}
														onChange={e => setNumPracticeTests(e.target.value)}
														disabled={disable}
													/>
												</Form.Group>
											</Form>
										</Container>
									</Tab.Pane>
									<Tab.Pane eventKey="third">
										<Container className="pt-4 pb-4 border">
											<Section
												sections={sections}
												setSections={setSections}
												disable={disable}
											/>
										</Container>
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</Col>
			</Row>
			<Row>
				<Col></Col>
				<Col>
					<Button
						className="m-4 p-2"
						type="submit"
						variant="primary"
						onClick={submitHandler}
						disabled={disable}
					>
						Guardar
					</Button>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
};

export default CreateCourse;
