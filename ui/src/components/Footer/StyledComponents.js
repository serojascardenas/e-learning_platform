import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.footer`
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: ${({ theme }) => theme.zIndex.navbar};
	max-width: 120rem;
	margin: 0 auto;
`;

const FooterContainer = styled(Container)`
	color: ${({ theme }) => theme.colors.white};
	font-weight: 600;
	background-color: ${({ theme }) => theme.colors.turquoise};
	padding: 0.75rem;
`;

const List = styled.ul`
	margin: 0 8rem;
	list-style: none;
	font-size: 18px;
`;

const ListItem = styled.li`
	padding-bottom: 0.6em;
`;
export {
	Wrapper,
	FooterContainer,
	List,
	ListItem,
};
