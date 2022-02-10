import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';

import CheckoutSteps from '../../components/CheckoutSteps';
import FormContainer from '../../components/FormContainer';
import { Button, H1 } from '../../components/Foundation';
import Switch from '../../components/Switch';

import { paymentMethods } from './paymentMethods';
import { savePaymentMethod } from '../../actions';

const Payment = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const { cart } = useSelector(state => state);
	const { billingAddress } = cart;

	const dispatch = useDispatch();

	if (!billingAddress) {
		history.push('/billing');
	}

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/place-order');
	};

	const handleChange = e => {
		setPaymentMethod(e.target.value);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<FormContainer>
				<H1>Método de Pago</H1>
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label className="mb-4" as="legend">
							Seleccione un método
						</Form.Label>
						<Col>
							{paymentMethods.map(method => (
								<Switch
									handleChange={handleChange}
									key={method.id}
									id={method.id}
									value={method.value}
									isChecked={method.value === paymentMethod}
								>
									{method.label}
								</Switch>
							))}
						</Col>
					</Form.Group>
					<Button type="submit" variant="primary">
						Continuar
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default Payment;
