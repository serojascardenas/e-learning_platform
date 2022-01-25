import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import { H1, Button } from '../../components/Foundation';

import { saveBillingAddress } from '../../actions';


const Billing = ({
	history,
}) => {
	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart);
	const { 
		billingAddress: {
			address: savedAddress,
			city: savedCity,
			postalCode: savedPostal,
			country: savedCountry,
		}, 
	} = cart;

	const [address, setAddress] = useState(savedAddress);
	const [city, setCity] = useState(savedCity);
	const [postalCode, setPostalCode] = useState(savedPostal);
	const [country, setCountry] = useState(savedCountry);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(saveBillingAddress({
			address,
			city,
			postalCode,
			country,
		}));
		history.push('/payment');
	};
	return (
		<>
			<CheckoutSteps
				step1
				step2
			/>
			<FormContainer>
				<H1>Facturación</H1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="address">
						<Form.Label>Dirección</Form.Label>
						<Form.Control
							type="text"
							value={address}
							required
							placeholder="Ingresa tu dirección"
							onChange={e => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mt-4" controlId="country">
						<Form.Label>País</Form.Label>
						<Form.Control
							type="text"
							value={country}
							required
							placeholder="Ingresa tu país"
							onChange={e => setCountry(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mt-4" controlId="city">
						<Form.Label>Ciudad</Form.Label>
						<Form.Control
							type="text"
							value={city}
							required
							placeholder="Ingresa tu ciudad"
							onChange={e => setCity(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className="mt-4" controlId="postal">
						<Form.Label>Código Postal</Form.Label>
						<Form.Control
							type="text"
							value={postalCode}
							required
							placeholder="Ingresa tu código postal"
							onChange={e => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button
						className="mt-4"
						type="submit"
						variant="primary"
					>Continuar</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default Billing;
