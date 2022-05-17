import styled, { css } from 'styled-components';
import {
	Button as BaseButton,
} from 'react-bootstrap';

const primaryStyles = css`
	background-color: ${({ theme }) => theme.colors.turquoise};
	color: ${({ theme }) => theme.colors.whiteGray};
	border: 1px solid ${({ theme }) => theme.colors.turquoise};

	&:hover {
		background-color: ${({ theme }) => theme.colors.white};
		color: ${({ theme }) => theme.colors.turquoise};
		border: 1px solid ${({ theme }) => theme.colors.turquoise};
	}

	&:active, &:focus {
		background-color: ${({ theme }) => theme.colors.white};
		color: ${({ theme }) => theme.colors.turquoise};
		border: 1px solid ${({ theme }) => theme.colors.turquoise};
	}
`;

const dangerStyles = css`
	background-color: ${({ theme }) => theme.colors.wine};
	color: ${({ theme }) => theme.colors.whiteGray};
	border: 1px solid ${({ theme }) => theme.colors.wine};

	&:hover {
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.wine};
	border: 1px solid ${({ theme }) => theme.colors.wine};
	}

	&:active, &:focus {
		background-color: ${({ theme }) => theme.colors.white};
		color: ${({ theme }) => theme.colors.wine};
		border: 1px solid ${({ theme }) => theme.colors.wine};
	}
`;

const variants = {
	primary: primaryStyles,
	danger: dangerStyles,
};

const Button = styled(BaseButton)`
	width: 100%;
	transition: all .4s ease-in-out;
	box-shadow: 0px 5px 10px rgba(0,0,0, 0.2);
	${({ variant }) => variant ? variants[variant] : variants['primary']}
`;

export {
	Button,
};