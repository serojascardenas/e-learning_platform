import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../actions';

import {
	Wrapper,
	Logo,
	ContentLinks,
	LinkItem,
	Content,
	SearchWrapper,
	UserActionsWrapper,
	Button,
	Link,
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
			<Logo>LMD</Logo>
			<Content>
				<ContentLinks>
					<LinkItem>
					Home
					</LinkItem>
					<LinkItem>
					Cursos
					</LinkItem>
					<LinkItem>
					Nosotros
					</LinkItem>
				</ContentLinks>
				<SearchWrapper>
					<Search placeholder="Buscar cursos"/>
				</SearchWrapper>
			</Content>
			<UserActionsWrapper>
				{userInfo 
					? ( <Button 
						variant="secondary" 
						onClick={logoutHandler}>Cerrar Sesión</Button>) 
					: (
						<>
							<Link to="/login">
								<Button variant="secondary">Iniciar Sesión</Button>
							</Link>
							<Link to="/register">
								<Button variant="negative">Crear Cuenta</Button>
							</Link>
						</>
					)}
			</UserActionsWrapper>
		</Wrapper>
	);};

export default Navbar;
