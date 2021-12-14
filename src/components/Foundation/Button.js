import styled, { css } from 'styled-components';


const commonStyles = css`
	font-weight: bold;
  cursor: pointer;
	border: none;
  border-radius: 5px;
  color: white;
  transition: all 0.5s ease;
	padding: 0.5rem 1rem;
	width: 7rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.shamrock};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Button = styled.button`
  ${commonStyles}

	background-color: ${({ theme, variant }) => {
		if (variant == 'secondary')
			return theme.colors.secondary;
		else if (variant == 'negative')
			return theme.colors.negative;

		return theme.colors.primary;
	}};
`;

export {
	Button,
};