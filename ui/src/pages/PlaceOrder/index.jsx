import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Container,
} from 'react-bootstrap';

import Message from '../../components/Message';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, ClampText, H2, Text } from '../../components/Foundation';

import { addDefaultSrc } from '../../components/Cards/utils';
import { formatDecimal } from '../../utils';
import { createOrder, resetCartItems } from '../../actions';

const PlaceOrder = ({
	history,
}) => {
	const dispatch = useDispatch();
	const { cart, orderCreate } = useSelector(state => state);

	const { order, success, error } = orderCreate;

	const {
		billingAddress: {
			address,
			city,
			postalCode,
			country,
		},
		paymentMethod,
		cartItems,
	} = cart;

	// Assume a tax of 5%, this can change whenever we want
	const TAX = 0.05;

	// calculate prices
	cart.itemsPrice = formatDecimal(cartItems.reduce((acc, item) => acc + item.price.amount, 0));
	cart.taxPrice = formatDecimal(Number((TAX * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
    Number(cart.taxPrice)
	).toFixed(2);

	useEffect(() => {
		if (success) {
			history.push(`orders/${order.id}`);
		}
		// not pushing order.id since this order id will be calculated at runtime and can change anytime
		// eslint-disable-next-line
  }, [history, success]);

	const placeOrderHandler = e => {
		e.preventDefault();
		dispatch(createOrder({
			orderItems: cartItems,
			billingAddress: cart.billingAddress,
			paymentMethod,
			itemsPrice: cart.itemsPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		}));
		dispatch(resetCartItems());
	};

	return (
		<>
			<CheckoutSteps 
				step1
				step2
				step3
				step4
			/>
			<Container className="mt-5">
				<Row>
					<Col md={8}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<H2>Facturación</H2>
								<Text>
									<strong>Dirección: </strong>
									{address}, {city} {postalCode}, {country}
								</Text>
							</ListGroup.Item>
							<ListGroup.Item>
								<H2>Método de pago</H2>
								<strong>Método: </strong>
								{paymentMethod}
							</ListGroup.Item>
							<ListGroup.Item>
								<H2>Detalle de la orden</H2>
								{cartItems.length === 0
									? <Message>Tu carrito está vacío</Message>
									: (
										<ListGroup variant="flush">
											{cartItems.map((item, idx) => (
												<ListGroup.Item key={idx}>
													<Row>
														<Col md={1}>
															<Image
																style={{ height: '2rem', width: '2rem', objectFit: 'cover' }}
																src={item.cover_image ?? '/images/not-found.jpg'}
																onError={addDefaultSrc}
																alt={item.title}
																roundedCircle
															/>
														</Col>
														<Col>
															<ClampText by={1}>
																<Link to={`/courses/${item.courseId}`}>{item.title}</Link>
															</ClampText>
														</Col>
														<Col md={4}>
															<Text textSize={0.95}>€{item.price.amount} + {TAX*100}% = €{(item.price.amount + (TAX * item.price.amount)).toFixed(2)}</Text>
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<H2>Resumen de Compra</H2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Cursos</Col>
									<Col>€{cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>€{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>€{cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{
								error && 
								<ListGroup.Item>
									<Message variant="danger">{error}</Message>
								</ListGroup.Item>
							}
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
                Ordenar
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default PlaceOrder;
