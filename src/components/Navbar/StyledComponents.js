import styled from 'styled-components/macro';

const Wrapper = styled.nav`
	padding: 0 2rem;
	display: flex;
	align-items: center;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary};
	height: ${({ theme }) => theme.heights.navbar};
	z-index: ${({ theme }) => theme.zIndex.navbar};
	justify-content: space-between;
`;

const Logo = styled.div`
	color: ${({ theme }) => theme.colors.primaryWhite};
	width: 10%;
`;

const Content = styled.div`
	display: flex;
	width: 90%;
`;

const ContentLinks = styled.ul`
	width: 20rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: ${({ theme }) => theme.colors.primaryWhite};
`;

const LinkItem = styled.li`
	list-style: none;
	cursor: pointer;
`;

const SearchWrapper = styled.div`
	margin: 0 3rem;
	width: 20rem;
`;

const Search = styled.input`
	width: 100%;
	padding: 0 0.75rem;
	border: none;
	border-radius: 5px;
	height: 2rem;
`;

const UserActionsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 18rem;

`;

export {
	Wrapper,
	Logo,
	ContentLinks,
	LinkItem,
	Content,
	SearchWrapper,
	Search,
	UserActionsWrapper,
};