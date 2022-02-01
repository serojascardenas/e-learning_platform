/* eslint-disable react/prop-types */
import React from 'react';

import { Card, Container } from 'react-bootstrap';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';
import CommentCard from './CommentCard';
import AccordionCard from './AccordionCard';

const StyledCard = styled(Card)`
	margin-bottom: 2rem;
`;

const CourseDetail = course => {
	return (
		<Container>
			<StyledCard>
				<Card.Header as="h3">Descripción</Card.Header>
				<Card.Body>
					<Card.Text>{course.description}</Card.Text>
				</Card.Body>
			</StyledCard>
			<StyledCard>
				<Accordion>
					{course.content_sections ? (
						course.content_sections.map((section, i) => (
							<AccordionCard key={i} {...section}></AccordionCard>
						))
					) : (
						<></>
					)}
				</Accordion>
			</StyledCard>
			<StyledCard>
				<Card.Header as="h3">Comentarios</Card.Header>
				{course.reviews &&
					course.reviews.map((review, i) => (
						<CommentCard key={i} {...review} />
					))}
			</StyledCard>
		</Container>
	);
};

export default CourseDetail;
