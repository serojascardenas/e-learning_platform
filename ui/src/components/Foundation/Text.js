import styled from 'styled-components';

const H1 = styled.h1`
	font-size: 1.8rem;
	padding: 1rem 0;
`;

const H2 = styled.h1`
	font-size: 1.4rem;
	padding: 0.5rem 0;
`;

const H3 = styled.h3`
	padding: 1rem 0;
`;

const Text = styled.p`
		margin: 0;
		font-size: ${({ textSize = 1 }) => `${textSize}rem`};
`;

const ClampText = styled(Text)`
	display: -webkit-box;
  -webkit-line-clamp: ${({ by = 2 }) => by};
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

export {
	ClampText,
	Text,
	H1,
	H2,
	H3,
};