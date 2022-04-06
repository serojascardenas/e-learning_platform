import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const Icon = styled.div`
	cursor: pointer;
	width: 25%;
	height: 100%;
	padding: 0.2rem;
	margin: 0.1rem;
	color: ${({ theme }) => theme.colors.turquoise};
	border: 0.1em solid;
	border-radius: 0.3em;
	text-align: center;
	&:hover {
		filter: brightness(120%);
	}
`;

const IconTools = styled.div`
	display: flex;
	flex-direction: row;
`;

const IconDiv = styled.div`
	width: 25%;
`;
export { Icon, IconTools, IconDiv };