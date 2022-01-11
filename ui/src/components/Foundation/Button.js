import styled, { css } from 'styled-components/macro';
import theme from '../../theme';

const variants = {
	primary: theme.colors.primary,
	secondary: theme.colors.secondary,
	terciary: theme.colors.terciary,
	negative: theme.colors.negative,
};

const commonStyles = css`
	font-weight: bold;
	cursor: pointer;
	border: none;
	border-radius: 5px;
	color: white;
	transition: all 0.2s ease;
	padding: 0.5rem 1rem;
	width: 100%;
	font-size: ${({ theme }) => theme.fontSizes.button};

	&:hover {
		filter: brightness(120%);
	}
`;

const Button = styled.button`
	background-color: ${({ variant }) => {
		return variants[variant] ?? variants['primary'];
	}};

	${commonStyles};
`;

export { Button };
