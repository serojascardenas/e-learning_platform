/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Accordion } from 'react-accessible-accordion';

import CommentCard from './CommentCard';
import AccordionCard from './AccordionCard';
import { StyledCard } from './StyledComponents';
import Message from '../Message';
import { isEmptyArray } from '../../utils';

const CourseDetail = ({ description, content_sections, reviews }) => {
	const getDescription = description => {
		console.log(description);
		const result = description.split(/\r?\n/);
		const elements = result.filter(element => <Card.Text>{element}</Card.Text>);
		return <Card.Body>{elements}</Card.Body>;
	};
	return (
		<Container>
			<StyledCard>
				<Card.Header as="h3">Descripción</Card.Header>
				{getDescription(description)}
			</StyledCard>
			<StyledCard>
				<Accordion>
					{content_sections &&
						content_sections.map((section, i) => (
							<AccordionCard key={i} section={section}></AccordionCard>
						))}
				</Accordion>
			</StyledCard>
			{isEmptyArray(reviews) ? (
				<Message>Este curso aún no ha sido comentado</Message>
			) : (
				<StyledCard>
					<Card.Header as="h3">Comentarios</Card.Header>
					{!isEmptyArray(reviews) &&
						reviews.map((review, i) => <CommentCard key={i} {...review} />)}
				</StyledCard>
			)}
		</Container>
	);
};

export default CourseDetail;
