import styled from 'styled-components/macro';
import { Button } from '../Foundation';


const FilterWrapper = styled.div`
  width: 400px;
  height: 300px;
	background-color: ${({ theme }) => theme.colors.whiteGray};
  border-radius: 10px 10px 10px 10px;
  padding: 20px;
  magin-right: 20px 0 20px 0;
`;

const Select = styled.select`
  width: 95%;
  height: 2.5rem;
  background: white;
  color: gray;
  padding-left: 1rem;
  font-size: 14px;
  border: none;
  margin: 0 0 0.8rem 0.8rem;
  border-radius: 0.25rem;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Input = styled.input`
  width: 95%;
  background: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  border-radius: 0.25rem;
  border: 0;
  color: ${({ theme }) => theme.colors.blackened};
  height: 2.5rem;
  line-height: 3.25rem;
  padding: 1rem;
  margin: 0 0 0.8rem 0.8rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
  &:last-of-type {
    margin-bottom: 0.8rem;
  }
`;

const Submit = styled(Button)`
  border-radius: 0.25rem;
  font-size: 14px;
	max-width: 60%;
  margin: 0 0 0.8rem 0.8rem;
  padding: 0.75rem;
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export {
  FilterWrapper,
  Select,
  Input,
  Submit,
};
