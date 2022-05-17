import styled from 'styled-components';

const Root = styled.div`
	width: 100%;
	margin-top: 0.25rem;
`;

const SearchInput = styled.input`
	color: ${({ theme }) => theme.colors.blackened} !important;
	width: 100%;
	min-width: 15rem;
	height: 2rem;
	margin: auto;
	border: none;
	border-radius: 1rem;
	padding: 0 1.25rem;
`;

export {
	Root,
	SearchInput,
};
