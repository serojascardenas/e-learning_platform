import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder } from '../../actions';
import { H2 } from '../Foundation';

import config from '../../config';
import { get } from '../../utils';
import { fetchComponentData } from '../../utils';


const PaymentForm = order => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
			billing_details: {
				address: {
					city: order.billingAddress.city,
					postal_code: order.billingAddress.postalCode,
				},
				name: order.user.name,
				email: order.user.email,
			},
		});

		setLoading(true);
		if (error) {
			console.log('[error]', error);
		} else {
			dispatch(
				payOrder(order.id, {
					id: paymentMethod.id,
					payer: {},
				})
			);
			setLoading(false);
		}
	};

	return (
		<Form>
			<H2>STRIPE</H2>
			<FormGroup className="mb-4">
				<Form.Label>Detalles de la Tarjeta</Form.Label>
				<CardElement />
			</FormGroup>
			<Button style={{ width: '100%' }} onClick={handleSubmit}>
				Comprar
			</Button>
		</Form>
	);
};

const StripePaymentForm = orderId => {
	const [stripePromise, setStripePromise] = useState('');

	useEffect(() => {
		const stripe = async () => {
			const { data: key } = await fetchComponentData({
				endpoint: get(config, 'app.api.routes.paymentProviders.stripe'),
				method: 'get',
			});
			setStripePromise(loadStripe(key));
		};

		stripe();
	}, []);

	return (
		<div>
			{stripePromise ? (
				<Elements stripe={stripePromise}>
					<PaymentForm {...orderId} />
				</Elements>
			) : (
				<></>
			)}
		</div>
	);
};

export default StripePaymentForm;
