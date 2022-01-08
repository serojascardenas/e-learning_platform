import styled, { css } from 'styled-components/macro';
import theme from '../../theme'

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
  transition: all 0.5s ease;
	padding: 0.5rem 1rem;
	width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.shamrock};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Button = styled.button`
  ${commonStyles};

	background-color: ${({ variant }) => {
		return variants[variant] ?? variants['primary'];
	}};
`;

export {
	Button,
};
