import styled from 'styled-components/macro';

const Wrapper = styled.header`
	z-index: ${({ theme }) => theme.zIndex.navbar};
`;

export {
	Wrapper,
};