import React from 'react';

import {
	Wrapper,
	Logo,
	ContentLinks,
	LinkItem,
	Content,
	SearchWrapper,
	UserActionsWrapper,
} from './StyledComponents';

import Search from '../Search';

import {
	Button,
} from '../Foundation';

const Navbar = () => (
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
			<Button variant="secondary">Login</Button>
			<Button variant="negative">Sign Up</Button>
		</UserActionsWrapper>
	</Wrapper>
);

export default Navbar;
