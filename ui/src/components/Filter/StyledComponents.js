import styled from 'styled-components/macro';
import { Form } from 'react-bootstrap';


const FilterWrapper = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.whiteGray};
	border-radius: 10px 10px 10px 10px;
	padding: 1.2rem;
	height: auto;
`;

const Select = styled(Form.Select)`
	width: 100%;
	height: 2.75rem;
	padding-left: 1rem;
	font-size: 14px;
	border: none;

	option {
		background: white;
		display: flex;
		white-space: pre;
	}
`;

const Input = styled(Form.Control)`
	background-color: white;
	color: black;
	border: none;

	&:focus {
		outline: none;
	}
`;

export {
	FilterWrapper,
	Select,
	Input,
};
