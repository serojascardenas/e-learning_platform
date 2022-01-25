import styled from 'styled-components';

const Root = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 0.25rem;
`;

const SearchInput = styled.input`
	width: 100%;
	min-width: 10rem;
	height: 2rem;
	margin: auto;
	border: none;
	border-radius: 1rem;
	padding: 0 1.5rem;
`;

export {
	Root,
	SearchInput,
};
