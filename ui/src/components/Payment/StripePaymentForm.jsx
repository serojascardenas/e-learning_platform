import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { payOrder } from '../../actions';
import { H2 } from '../Foundation';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_STRIPE_KEY);

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

const StripePaymentForm = orderId => (
	<Elements stripe={stripePromise}>
		<PaymentForm {...orderId} />
	</Elements>
);

export default StripePaymentForm;
