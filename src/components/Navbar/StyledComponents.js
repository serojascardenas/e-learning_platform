import styled from 'styled-components/macro';

const Wrapper = styled.nav`
	display: flex;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.shamrock};
	height: ${({ theme }) => theme.heights.navbar};
	z-index: ${({ theme }) => theme.zIndex.navbar};
`;

export {
	Wrapper,
};