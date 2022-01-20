import styled from 'styled-components';

const ClampText = styled.p`
	display: -webkit-box;
  -webkit-line-clamp: ${({ by = 2 }) => by};
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const Text = styled.p``;

export {
	ClampText,
	Text,
};