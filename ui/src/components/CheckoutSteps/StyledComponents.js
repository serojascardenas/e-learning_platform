import styled, { css } from 'styled-components';
import { Nav } from 'react-bootstrap';
import { getMediaMinWidth } from '../../utils';

const Line = styled.span`
	display: inline;
	width: 0;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.gray};


	${getMediaMinWidth('xsm')} {
		width: 1rem;
	}

	${getMediaMinWidth('sm')} {
		width: 2rem;
	}

	${getMediaMinWidth('md')} {
		width: 4rem;
	}
`;

const NavItem = styled(Nav.Item)`
	margin-right: 0;
`;

const NavLink = styled(Nav.Link)`
	color: ${({ theme }) => theme.colors.blackened}; 
`;

const StepWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const activeStyles = css`
	background-color: ${({ theme }) => theme.colors.turquoise};
	color: ${({ theme }) => theme.colors.white};

	&::before {
		border-color: ${({ theme }) => theme.colors.turquoise};
		filter: brightness(80%);
	}
`;

const Circle = styled.div`
	font-weight: 900;
	font-size: 0.95rem;
	display: flex;
	justify-content: center;
	position: relative;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	padding: 5px;
	background-color: ${({ theme }) => theme.colors.gray};
	transition: all 0.5s ease-in;
	
	&::before {
		content: "";
		display: block;
		position: absolute;
		border-radius: 50%;
		top: -2px;
		left: -2px;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		background: transparent;
		border: 2px solid #A1A1A1;
		transition: all 0.1s ease-in;
	}

	${({ isActive }) => isActive && activeStyles};
`;

export {
	Line,
	NavItem,
	StepWrapper,
	ItemContainer,
	Circle,
	NavLink,
};