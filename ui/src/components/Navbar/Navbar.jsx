import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
	Navbar as Navigation,
	Nav,
	Container,
	Image,
	NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Logo from '../../assets/images/logo_apaisado.jpg';

import Search from '../Search';
import { Text } from '../Foundation';
import {
	ImageNavbar,
	Wrapper,
} from './StyledComponents';

import { logout } from '../../actions';


const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		userLogin: { userInfo },
	} = useSelector(state => state);

	const logoutHandler = () => {
		dispatch(logout());
		history.push('/');
	};

	return (
		<Wrapper>
			<ImageNavbar>
				<Image src={Logo} />
			</ImageNavbar>
			<Navigation expand="sm" collapseOnSelect>
				<Container>
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
								<Search placeholder="Buscar Cursos" />
							</Nav.Item>
						</Nav>
						<Nav className="ml-auto justify-content-left">
							<>
								<LinkContainer to="/cart">
									<Nav.Link>
										<FontAwesomeIcon icon={faShoppingCart}/>
									</Nav.Link>
								</LinkContainer>

								{userInfo ? (
									<NavDropdown title={userInfo.name} id="username">
										<LinkContainer to="/profile">
											<NavDropdown.Item>Perfil</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/my-orders">
											<NavDropdown.Item>Mis Órdenes</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logoutHandler}>
											Salir
										</NavDropdown.Item>
									</NavDropdown>
								) : (
									<>
										<Nav.Item>
											<LinkContainer to="/login">
												<Nav.Link><Text textSize="0.8">Iniciar Sesión</Text></Nav.Link>
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
	);
};

export default Navbar;
