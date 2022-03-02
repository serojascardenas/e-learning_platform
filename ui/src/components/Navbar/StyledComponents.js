import {
	TabContainer,
} from 'react-bootstrap';
import styled, { css } from 'styled-components/macro';


const commonStyles = css`
	filter: opacity(70%);
	background-color: ${({ theme }) => theme.colors.turquoise} !important;
	color: ${({ theme }) => theme.colors.white} !important;
`;

const Wrapper = styled.header`
	* {
		color: ${({ theme }) => theme.colors.white} !important;
	}

	.search-box {
		color: ${({ theme }) => theme.colors.blackened} !important;
	}

	.dropdown-menu {
		padding: 0;
	}

	.dropdown-item {
		color: ${({ theme }) => theme.colors.black} !important;
		
		&:active {
			${commonStyles};
		}
	}

	.active.dropdown-item {
		${commonStyles};
	}
	
	z-index: ${({ theme }) => theme.zIndex.navbar};
	max-width: 120rem;;
	margin: 0 auto;
`;

const ImageNavbar = styled(TabContainer)`
	height: 0.5rem;
`;

export {
	Wrapper,
	ImageNavbar,
};
