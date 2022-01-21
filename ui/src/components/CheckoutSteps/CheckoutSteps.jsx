import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import {
	StepWrapper,
	NavItem,
	Line,
	ItemContainer,
	Circle,
} from './StyledComponents';

const CheckoutSteps = ({
	className,
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
							<Nav.Link>Sign In</Nav.Link>
						</LinkContainer>
					</ItemContainer>
					<Line/>
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>1</Circle>
						<Nav.Link disabled>Sign In</Nav.Link>
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
							<Nav.Link>Facturacion</Nav.Link>
						</LinkContainer>
					</ItemContainer>
					<Line />
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>2</Circle>
						<Nav.Link disabled>Facturacion</Nav.Link>
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
							<Nav.Link>Pago</Nav.Link>
						</LinkContainer>
					</ItemContainer>
					<Line />
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle isActive={step4}>3</Circle>
						<Nav.Link disabled>Pago</Nav.Link>
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
							<Nav.Link>Ordenar</Nav.Link>
						</LinkContainer>
					</ItemContainer>
				</StepWrapper>
			) : (
				<StepWrapper>
					<ItemContainer>
						<Circle>4</Circle>
						<Nav.Link disabled>Ordenar</Nav.Link>
					</ItemContainer>
				</StepWrapper>
			)}
		</NavItem>
	</Nav>
);

export default CheckoutSteps;
