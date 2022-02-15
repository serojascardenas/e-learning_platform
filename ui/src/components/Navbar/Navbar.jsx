import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import {
	Navbar as Navigation,
	Nav,
	Container,
	NavDropdown,
	Badge,
	Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../../actions';

import {
	Wrapper,
} from './StyledComponents';

import Search from '../Search';

const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();


	const { 
		userLogin: {
			userInfo,
		}, 
	} = useSelector(state => state);

	const logoutHandler = () => {
		dispatch(logout());
		history.push('/');
	};

	return (
		<Wrapper>
			<Navigation bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container fluid>
					<LinkContainer to="/">
						<Navigation.Brand>LMD</Navigation.Brand>
					</LinkContainer>
					<Navigation.Toggle aria-controls="basic-navbar-nav" />
					<Navigation.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto justify-content-center">
							<Nav.Item>
								<LinkContainer to="/">
									<Nav.Link>Cursos</Nav.Link>
								</LinkContainer>
							</Nav.Item>
							<Nav.Item>
								<LinkContainer to="/about-us">
									<Nav.Link>Nosotros</Nav.Link>
								</LinkContainer>
							</Nav.Item>
							<Nav.Item>
								<Search 
									placeholder="Buscar Cursos"
								/>
							</Nav.Item>
						</Nav>
						<Nav className="ml-auto">
							<>
								<LinkContainer to="/cart">
									<Nav.Link>
										<FontAwesomeIcon icon={faShoppingCart} />
									</Nav.Link>
								</LinkContainer>
								{userInfo 
									? ( 
										<NavDropdown
											title={userInfo.name}
											id="username"
										>
											<LinkContainer to="/profile">
												<NavDropdown.Item>Perfil</NavDropdown.Item>
											</LinkContainer>

											<LinkContainer to="/my-orders">
												<NavDropdown.Item>Mis Órdenes</NavDropdown.Item>
											</LinkContainer>
											<NavDropdown.Item onClick={logoutHandler}>Salir</NavDropdown.Item>
										</NavDropdown>
									) : (
										<>
											<Nav.Item>
												<LinkContainer to="/login">
													<Nav.Link>Iniciar Sesión</Nav.Link>
												</LinkContainer>
											</Nav.Item>
											<Nav.Item>
												<LinkContainer to="/register">
													<Nav.Link>Crear Cuenta</Nav.Link>
												</LinkContainer>
											</Nav.Item>
										</>
									)}
							</>
						</Nav>
					</Navigation.Collapse>
				</Container>
			</Navigation>
		</Wrapper>
	);};

export default Navbar;
