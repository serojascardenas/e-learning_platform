import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Joi from 'joi-browser';
import {
	Col,
	Row,
	Form,
} from 'react-bootstrap';

import Message from '../../components/Message';
import { Button } from '../../components/Foundation';

import FormContainer from '../../components/FormContainer';
import Switch from '../../components/Switch';

import {
	createCourse,
} from '../../actions';

import { isEmptyArray, formatDecimal } from '../../utils';
import { currencyType as listOfCurrencies } from './currencyType';
import { category as listOfCategories } from './category';
import { subCategory as listOfSubcategories } from './subCategory';

const CreateCourse = ({
	history,
}) => {
	const dispatch = useDispatch();
	const { userLogin } = useSelector(state => state);
	const { userInfo, error } = userLogin;

	const schema = Joi.object({
		title: Joi.string().min(5).max(300).required(),
		description: Joi.string().min(3).required(),
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
	const [videoContentLength, setVideoContentLength] = useState('');
	const [numArticles, setNumArticles] = useState('');
	const [numPracticeTests, setNumPracticeTests] = useState('');
	const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);
	const [hasCertificate, setHasCertificate] = useState(false);
	const [message, setMessage] = useState(null);

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
			const formData = new FormData();
			const instructors = [];
			instructors.push(userInfo.id);
			formData.append('body', JSON.stringify({
				title,
				description,
				category,
				sub_category: subCategory,
				price: {
					amount: formatDecimal(amount),
					currency: currency,
					currency_symbol: currencySymbol,
				},
				attributes: {
					video_content_length: formatDecimal(videoContentLength),
					num_articles: parseInt(numArticles),
					num_practice_tests: parseInt(numPracticeTests),
					has_lifetime_access: hasLifetimeAccess,
					has_certificate: hasCertificate,
				},
				content_sections: [  //TODO get from form
					{
						title: 'Section one',
						order: 0,
						items: [
							{
								name: 'description of section',
								video: 'avb',
								order: 0,
							},
						],
					},
				],
				instructors,
			}));
			if (coverImage) {
				formData.append('cover_image', coverImage[0]);
			}
			if (coverMovie) {
				formData.append('cover_movie', coverImage[0]);
			}
			dispatch(createCourse(formData));
		}
	};
	const onChangeCurrency = async e => {
		let arr = e.split('-');
		setCurrency(arr[0].trim());
		setCurrencySymbol(arr[1].trim());
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		} else {
			//
		}
		
	}, [userInfo, history]);
	return (
		<FormContainer>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			<Form onSubmit={submitHandler}>
				<Row>
					<Col className="my-4">
						<Form.Group className='mb-4'>
							<Form.Label>Título</Form.Label>
							<Form.Control
								value={title}
								required
								min='5'
								max='300'
								placeholder='Ingresa el título'
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Descripción</Form.Label>
							<Form.Control
								as='textarea'
								value={description}
								required
								rows={3}
								placeholder='Ingresa la descripción'
								onChange={e => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Control
								as='select'
								value={category}
								required
								onChange={e => setCategory(e.target.value)}
							>
								<option>Categoria</option>
								{listOfCategories || !isEmptyArray(listOfCategories) ? (
									listOfCategories.map((item, i) => (
										<option key={i} value={item.value}>{item.label}</option>
									))
								) : (
									<></>
								)}
							</Form.Control>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Control
								as='select'
								value={subCategory}
								required
								onChange={e => setSubCategory(e.target.value)}
							>
								<option>Sub Categoria</option>
								{listOfSubcategories || !isEmptyArray(listOfSubcategories) ? (
									listOfSubcategories.map((item, i) => (
										<option key={i} value={item.value}>{item.label}</option>
									))
								) : (
									<></>
								)}
							</Form.Control>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Portada del curso</Form.Label>
							<Form.Control
								type='file'
								onChange={e => setCoverImage(e.target.files)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Video de demostración</Form.Label>
							<Form.Control
								type='file'
								onChange={e => setCoverMovie(e.target.files)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Precio</Form.Label>
							<Row>
								<Col>
									<Form.Control
										as='select'
										required
										onChange={e => onChangeCurrency(e.target.value)}
									>
										<option>Moneda</option>
										{listOfCurrencies || !isEmptyArray(listOfCurrencies) ? (
											listOfCurrencies.map((item, j) => (
												<option key={j} value={`${item.id} - ${item.symbol}`}>{`${item.label} (${item.symbol})`}</option>
											))
										) : (
											<></>
										)}
									</Form.Control>
								</Col>
								<Col>
									<Form.Control
										type='number'
										step={'any'}
										value={amount}
										required
										placeholder='0.00'
										onChange={e => setAmount(e.target.value)}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Switch
								handleChange={e => setHasLifetimeAccess(e.target.checked)}
								id='hasLifetimeAccessId'
								value={hasLifetimeAccess}
							>
								Tiene acceso ilimitado?
							</Switch>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Switch
								handleChange={e => setHasCertificate(e.target.checked)}
								id='hasCertificateId'
								value={hasCertificate}
							>
								Tiene Certificado?
							</Switch>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Cuantidad de horas del curso</Form.Label>
							<Form.Control
								type='number'
								value={videoContentLength}
								onChange={e => setVideoContentLength(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Cuantidade de articulos</Form.Label>
							<Form.Control
								type='number'
								value={numArticles}
								onChange={e => setNumArticles(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>Cuantidad de actividades</Form.Label>
							<Form.Control
								type='number'
								value={numPracticeTests}
								onChange={e => setNumPracticeTests(e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button
					className="mt-4"
					type="submit"
					variant="primary"
				>Añadir Curso</Button>
			</Form>
		</FormContainer>
	);
};

export default CreateCourse;