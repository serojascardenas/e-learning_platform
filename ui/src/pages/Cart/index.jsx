import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Row,
	Col,
	ListGroup,
	Card,
	Modal,
} from 'react-bootstrap';

import CourseCard from '../../components/Cards';
import Message from '../../components/Message';
import { ClampText, H1, H2, Text, Button } from '../../components/Foundation';

import { 
	addToCart, 
	removeFromCart,
} from '../../actions';


const Cart = ({
	match,
	history,
}) => {

	const [showModal, setShowModal] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState({});

	const courseId = match.params.id;

	const { cart } = useSelector(state => state);
	const { cartItems } = cart;

	const dispatch = useDispatch();

	useEffect(() => {
		if (courseId) {
			dispatch(addToCart(courseId));
		}
	}, [dispatch, courseId]);

	const removeFromCartHandler = () => {
		dispatch(removeFromCart(selectedCourse.courseId));
		setShowModal(false);
	};

	const openModal = course => {
		setShowModal(true);
		setSelectedCourse(course);
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=billing');
	};

	return (
		<Container className="mt-5">
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Remover curso del carrito</Modal.Title>
				</Modal.Header>
				<Modal.Body>
          Estas seguro que deseas remover este curso del carrito?
					<ClampText>{selectedCourse.title}</ClampText>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
					</Button>
					<Button variant="primary" onClick={removeFromCartHandler}>
            Si
					</Button>
				</Modal.Footer>
			</Modal>
			<Row>
				<Col md={8}>
					<H1>Cesta</H1>
					{cartItems?.length === 0
						? <Message>Tu carrito esta vacio <Link to="/">Ir a Cursos</Link></Message>
						: (
							<ListGroup variant="flush">
								{cartItems.map(course => (
									<Row key={course.id}>
										<CourseCard 
											variant="horizontal"
											showDescription={true}
											showActionButtons={false}
											{...course}
										>
											<Button 
												size="sm" 
												variant="danger"
												onClick={() => openModal(course)}
											>
												Eliminar
											</Button>
										</CourseCard>
									</Row>
								))}
							</ListGroup>
						)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<H2>Subtotal ({cartItems.reduce((acc, _) => acc + 1, 0)}) cursos</H2>
							</ListGroup.Item>
							<ListGroup.Item>
								{cartItems.map(course => (
									<Card.Text key={course.id}>
										<Row>
											<Col sm={6} md={8}>
												<ClampText by={2}>{course.title}</ClampText>
											</Col> 
											<Col sm={6} md={4}>
												<Text className="d-flex justify-content-end">{course.price.price_string}</Text>
											</Col>
										</Row>
									</Card.Text>
								))}
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col md={6}>
										<Text>Subtotal</Text>
									</Col>
									<Col md={6}>
										<Text className="d-flex justify-content-end">€ {cartItems.reduce((acc, course) => acc + course?.price?.amount, 0).toFixed(2)}</Text>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>Proceder a Checkout</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Cart;
