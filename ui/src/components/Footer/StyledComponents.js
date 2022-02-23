import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.footer`
	z-index: ${({ theme }) => theme.zIndex.navbar};
	padding: 1em 8em 0em 8em !important;
`;

const FooterContainer = styled(Container)`
	color: ${({ theme }) => theme.colors.white};
	font-weight: 600;
	background-color: ${({ theme }) => theme.colors.turquoise};
	padding: 1em 1em 0em 1em;
`;

const List = styled.ul`
	padding-left: 6em;
	list-style: none;
	font-size: 18px;
`;

const ListItem = styled.li`
	padding-bottom: 0.6em;
`;
export { Wrapper, FooterContainer, List, ListItem };
