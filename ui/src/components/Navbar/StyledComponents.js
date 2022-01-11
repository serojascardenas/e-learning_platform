import styled from 'styled-components/macro';

import { Link as BaseLink } from 'react-router-dom';

import {
	Button as BaseButton,
} from '../Foundation';

const Wrapper = styled.nav`
	padding: 0 2rem;
	display: flex;
	align-items: center;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary};
	height: ${({ theme }) => theme.heights.navbar};
	z-index: ${({ theme }) => theme.zIndex.navbar};
	justify-content: space-between;
`;

const Logo = styled.div`
	color: ${({ theme }) => theme.colors.primaryWhite};
	width: 10%;
`;

const Content = styled.div`
	display: flex;
	width: 90%;
`;

const ContentLinks = styled.ul`
	width: 20rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: ${({ theme }) => theme.colors.primaryWhite};
`;

const LinkItem = styled.li`
	list-style: none;
	cursor: pointer;
`;

const SearchWrapper = styled.div`
	margin: 0 3rem;
	width: 20rem;
`;

const Link = styled(BaseLink)`
	text-decoration: none;

	
	&:last-of-type {
		margin-left: 1rem;
	}
`;

const UserActionsWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: auto;
`;

const Button = styled(BaseButton)`
	width: 8rem;
`;

export {
	Wrapper,
	Logo,
	ContentLinks,
	LinkItem,
	Content,
	SearchWrapper,
	UserActionsWrapper,
	Button,
	Link,
};