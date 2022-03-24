import styled from 'styled-components/macro';

const Icon = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
	padding: 0.2rem;
	color: ${({ theme }) => theme.colors.turquoise};

	&:hover {
		filter: brightness(120%);
	}
`;

export {
	Icon,
};