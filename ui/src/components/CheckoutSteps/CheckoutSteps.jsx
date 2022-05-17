import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import {
	StepWrapper,
	NavItem,
	NavLink,
	Line,
	ItemContainer,
	Circle,
} from './StyledComponents';

const CheckoutSteps = ({
	step1,
	step2,
	step3,
	step4,
}) => (
	<Nav className='justify-content-center mt-5'>
		<NavItem>
			{step1 ? (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step1 || step2 || step3 || step4}>1</Circle>
						<LinkContainer to="/login">
							<NavLink>Sing In</NavLink>
						</LinkContainer>
					</ItemContainer>
					<Line/>
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>1</Circle>
						<NavLink disabled>Sign In</NavLink>
					</ItemContainer>
					<Line />
				</StepWrapper>
			)}
		</NavItem>
		<NavItem>
			{step2 ? (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step2 || step3 || step4}>2</Circle>
						<LinkContainer to="/billing">
							<NavLink>Facturacion</NavLink>
						</LinkContainer>
					</ItemContainer>
					<Line />
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>2</Circle>
						<NavLink disabled>Facturacion</NavLink>
					</ItemContainer>
					<Line />
				</StepWrapper>
			)}
		</NavItem>
		<NavItem>
			{step3 ? (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step3 || step4}>3</Circle>
						<LinkContainer to="/payment">
							<NavLink>Pago</NavLink>
						</LinkContainer>
					</ItemContainer>
					<Line />
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step4}>3</Circle>
						<NavLink disabled>Pago</NavLink>
					</ItemContainer>
					<Line />
				</StepWrapper>
			)}
		</NavItem>
		<NavItem>
			{step4 ? (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step4}>4</Circle>
						<LinkContainer to="/place-order">
							<NavLink>Ordenar</NavLink>
						</LinkContainer>
					</ItemContainer>
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>4</Circle>
						<NavLink disabled>Ordenar</NavLink>
					</ItemContainer>
				</StepWrapper>
			)}
		</NavItem>
	</Nav>
);

export default CheckoutSteps;
