import styled, { css, keyframes } from 'styled-components';

const Label = styled.label`
	cursor: pointer;
	display: flex;
	margin-bottom: 1.5rem;
`;

const Content = styled.p`
	margin: 0;
	padding: 0;
	margin-left: 1rem;
`;

const StyledSwitch = styled.span`
	display: block;
	width: 3rem;
	padding: 0.25rem;
	border-radius: 1.25rem;
	background: ${({ theme }) => theme.colors.gray};
	transition: all 0.35s;
`;

const goIn = keyframes`
	45% {
		transform: scaleX(1.25);
	}
`;

const goOut = keyframes`
	55% {
		transform: scaleX(1.25);
	}
`;

const goInAnimation = css`
	animation: ${goIn} 0.35s;
`;

const goOutAnimation = css`
	animation: ${goOut} 0.35s;
`;

const Knob = styled.span`
	display: block;
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background: ${({ theme }) => theme.colors.white};

	${({ isChecked }) => !isChecked && goOutAnimation};
	transition: all 0.35s;
`;

const SwitchInput = styled.input`
	position: absolute;
	transform: scale(0);
	
	&:checked ~ ${StyledSwitch} {
		background: #1ac0a2;
	};

	&:checked ~ ${StyledSwitch} ${Knob} {
		margin-left: 1.5rem;

		${({ isChecked }) => !isChecked && goInAnimation};
	};
`;

export {
	Label,
	StyledSwitch,
	Knob,
	SwitchInput,
	Content,
};