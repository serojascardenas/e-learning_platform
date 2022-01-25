/* eslint-disable react/prop-types */
import React from 'react';

import { Card, Container } from 'react-bootstrap';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import styled from 'styled-components';

const StyledCard = styled(Card)`
	margin-bottom: 40px;
`;

const StyledAccordionItemHeading = styled(AccordionItemHeading)`
	background-color: rgba(0, 0, 0, 0.03);
	padding: 0.75rem 1.25rem;
	border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledPanel = styled.p`
	padding: 0.75rem 1.25rem;
`;

const CourseDetail = ({ description }) => {
	return (
		<Container>
			<StyledCard>
				<Card.Header as="h1">Descripción</Card.Header>
				<Card.Body>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</StyledCard>

			<Accordion>
				<AccordionItem>
					<StyledAccordionItemHeading>
						<AccordionItemButton>
							<h3>Sección 1</h3>
						</AccordionItemButton>
					</StyledAccordionItemHeading>
					<AccordionItemPanel>
						<StyledPanel>
							Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
							occaecat ut occaecat consequat est minim minim esse tempor laborum
							consequat esse adipisicing eu reprehenderit enim.
						</StyledPanel>
					</AccordionItemPanel>
				</AccordionItem>
				<AccordionItem>
					<StyledAccordionItemHeading>
						<AccordionItemButton>
							<h3>Sección 2</h3>
						</AccordionItemButton>
					</StyledAccordionItemHeading>
					<AccordionItemPanel>
						<StyledPanel>
							In ad velit in ex nostrud dolore cupidatat consectetur ea in ut
							nostrud velit in irure cillum tempor laboris sed adipisicing eu
							esse duis nulla non.
						</StyledPanel>
					</AccordionItemPanel>
				</AccordionItem>
			</Accordion>
		</Container>
	);
};

export default CourseDetail;
