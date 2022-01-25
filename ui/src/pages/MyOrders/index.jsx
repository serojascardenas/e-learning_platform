import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Table,
	Container,
	Col,
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { myOrdersList as myOrdersListAction } from '../../actions';
import { Button } from '../../components/Foundation';

const MyOrders = ({
	history,
}) => {
	const dispatch = useDispatch();

	const { myOrdersList, userLogin } = useSelector(state => state);
	
	const { userInfo } = userLogin;
	const {
		loading,
		error,
		orders = [],
	} = myOrdersList;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login?redirect=my-orders');
		} else {
			dispatch(myOrdersListAction());
		}
	}, [dispatch, history, userInfo]);

	return (
		<Container className="my-5">
			{ loading
				? <Loader /> 
				: error 
					? <Message variant="danger">{error}</Message> 
					: (
						<Col>
							<h2>Mis Órdenes</h2>
							{orders.length === 0 && <Message variant="info">Todavia no tienes ninguna orden.</Message>}
							<Table
								striped
								bordered
								hover
								responsive
								className="table-sm">
								<thead>
									<tr>
										<th>Id</th>
										<th>Fecha</th>
										<th>Total</th>
										<th>Pagado</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{orders.map(order => (
										<tr key={order.id}>
											<td>{order.id}</td>
											<td>{order.createdAt.substring(0, 10)}</td>
											<td>${order.totalPrice}</td>
											<td>{order.isPaid
												? order.paidAt.substring(0, 10)
												: <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
											<td>
												<LinkContainer to={`/orders/${order.id}`}>
													<Button
														className="btn-sm"
													>
                        Detalle
													</Button>
												</LinkContainer>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Col>
					)}
		</Container>
	);
};

export default MyOrders;
