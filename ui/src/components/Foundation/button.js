import styled, { css } from 'styled-components';
import {
	Button as BaseButton,
} from 'react-bootstrap';

const primaryStyles = css`
	background-color: ${({ theme }) => theme.colors.turquoise};
	color: ${({ theme }) => theme.colors.whiteGray};

	&:hover {
		background-color: ${({ theme }) => theme.colors.turquoise};
		filter: brightness(105%); 
	}

	&:active, &:focus {
		background-color: ${({ theme }) => theme.colors.turquoise} !important;
		filter: brightness(110%); 
	}
`;

const dangerStyles = css`
	background-color: ${({ theme }) => theme.colors.wine};
	color: ${({ theme }) => theme.colors.whiteGray};

	&:hover {
		background-color: ${({ theme }) => theme.colors.wine};
		filter: brightness(105%); 
	}

	&:active, &:focus {
		background-color: ${({ theme }) => theme.colors.wine} !important;
		filter: brightness(110%); 
	}
`;

const variants = {
	primary: primaryStyles,
	danger: dangerStyles,
};

const Button = styled(BaseButton)`
	${({ variant }) => variant ? variants[variant] : variants['primary']}
`;

export {
	Button,
};