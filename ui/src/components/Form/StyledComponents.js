import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button } from '../Foundation'

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #F2F3F4;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 28rem;
	max-width: 35rem;
	border-radius: 0.25rem;
	margin: auto;
	padding: 2rem 4rem;
`;

const Error = styled.div`
  background: #e87c03;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  margin: 0 0 1rem;
  color: #fff;
  padding: 1rem 1.25rem;
`;

const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 28.25rem;
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.title.black};
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.75rem;
`;

const Text = styled.p`
  color: #737373;
  font-size: 1rem;
  font-weight: 500;
`;

const TextSmall = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.blackened};
`;

const Link = styled(ReactRouterLink)`
  color: ${({ theme }) => theme.colors.primary};
	font-size: 0.75rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  border: 0;
  color: ${({ theme }) => theme.colors.blackened};
  height: 2rem;
  line-height: 3.25rem;
  padding: 0.25rem 1.25rem;
  margin-bottom: 1.25rem;

	::placeholder {
		color: ${({ theme }) => theme.colors.placeholder};
	}

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const Bottom = styled.div`
	margin-top: 2rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`

const Submit = styled(Button)`
  border-radius: 0.25rem;
  font-size: 1rem;
	max-width: 60%;
  margin: auto;
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
	Container,
	Error,
	Base,
	Title,
	Text,
	TextSmall,
	Link,
	Input,
	Submit,
	Bottom,
};
