import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, ListGroup, Image, Container } from 'react-bootstrap';

import { PayPalButton } from 'react-paypal-button-v2';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { getOrderDetails, payOrder } from '../../actions';

import config from '../../config';
import { get } from '../../utils';

import { ORDER_CREATE_RESET, ORDER_PAY_RESET } from '../../constants';

import { fetchComponentData } from '../../utils';
import { ClampText, H1, H2, Text } from '../../components/Foundation';
import { addDefaultSrc } from '../../components/Cards/utils';
import { paymentMethods } from '../Payment/paymentMethods';
import StripePaymentForm from '../../components/Payment/StripePaymentForm';

const Order = ({ match, history }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const { orderDetails, orderPay, userLogin } = useSelector(state => state);

	const { order, loading, error } = orderDetails;
	const { loading: loadingPay, success: successPay } = orderPay;
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push(`/login?redirect=/order/${orderId}`);
		}
		const addPayPalScript = async () => {
			const { data: clientId } = await fetchComponentData({
				endpoint: get(config, 'app.api.routes.paymentProviders.paypal'),
				method: 'get',
			});

			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;

			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || order.id !== orderId || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [order, orderId, dispatch, userInfo, history, successPay]);

	const successPaymentHandler = paymentResult => {
		dispatch(payOrder(orderId, paymentResult));
		dispatch({ type: ORDER_CREATE_RESET });
	};

	return (
		<Container className="mt-5">
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<H1>Orden {order.id}</H1>
					<Row>
						<Col md={7}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<H2>Facturación</H2>
									<Text>
										<strong>Nombre: </strong>
										{order.user.name}
									</Text>
									<Text>
										<strong>Email: </strong>
										<a href={`mailto:${order.user.email}`}>
											{order.user.email}
										</a>
									</Text>
									<Text>
										<strong>Dirección: </strong>
										{order.billingAddress.address}, {order.billingAddress.city}{' '}
										{order.billingAddress.postalCode},{' '}
										{order.billingAddress.country}
									</Text>
								</ListGroup.Item>
								<ListGroup.Item>
									<H2>Método de Pago</H2>
									<Text className="mb-3">
										<strong>Método: </strong>
										{order.paymentMethod}
									</Text>
									{order.isPaid ? (
										<Message variant="success">
											Fecha de Pago: {order.paidAt}
										</Message>
									) : (
										<Message variant="danger">
											El pago todavía está pendiente
										</Message>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									<H2>Detalle de la Orden</H2>
									{order.orderItems.length === 0 ? (
										<Message>Tu orden esta vacía</Message>
									) : (
										<ListGroup variant="flush">
											{order.orderItems.map((item, idx) => (
												<ListGroup.Item key={idx}>
													<Row>
														<Col md={1}>
															<Image
																style={{
																	height: '2rem',
																	width: '2rem',
																	objectFit: 'cover',
																}}
																src={
																	item.cover_image ?? '/images/not-found.jpg'
																}
																onError={addDefaultSrc}
																alt={item.title}
																rounded
															/>
														</Col>
														<Col>
															<ClampText by={1}>
																<Link to={`/courses/${item.courseId}`}>
																	{item.title}
																</Link>
															</ClampText>
														</Col>
														<Col md={4}>
															<Text textSize={0.95}>
																€{item.price.amount} + {0.05 * 100}% = €
																{(
																	item.price.amount +
																	0.05 * item.price.amount
																).toFixed(2)}
															</Text>
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={5}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<H2>Resumen de Compra</H2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Cursos</Col>
											<Col>€ {order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>€ {order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>€ {order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									{!order.isPaid && (
										<ListGroup.Item>
											{loadingPay || !sdkReady ? (
												<Loader />
											) : order.paymentMethod === paymentMethods[0].value ? (
												<PayPalButton
													amount={order.totalPrice}
													onSuccess={successPaymentHandler}
												/>
											) : (
												<StripePaymentForm {...order} />
											)}
										</ListGroup.Item>
									)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Order;
