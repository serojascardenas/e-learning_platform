import { TabContainer } from 'react-bootstrap';
import styled from 'styled-components/macro';

const Wrapper = styled.header`
	z-index: ${({ theme }) => theme.zIndex.navbar};
	padding: 1em 8em 0em 8em !important;
`;

const ImageNavbar = styled(TabContainer)`
	height: '20px !important';
`;
export { Wrapper, ImageNavbar };
