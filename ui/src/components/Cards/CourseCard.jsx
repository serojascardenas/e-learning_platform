/* eslint-disable react/prop-types */
import React from 'react';

import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import {
	formatPrice,
	concatInstructors,
	averageRating,
} from '../../utils/utilities';

import Rating from '../Rating';

const CourseCard = ({ 
	course,
}) => {
	return (
		<Card className="h-100">
			<Link to={`/courses/${course.id}`}>
				<Card.Img
					style={{ height: '15rem' }}
					src={course.cover_image || '/images/not-found.jpg'}
					variant="top"
				/>
			</Link>
			<Card.Body>
				<Link to={`/courses/${course.id}`}>
					<Card.Title as="div">
						<strong>{course.title}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="p">
					<Card.Text>{concatInstructors(course.instructors)}</Card.Text>
					<Rating
						value={averageRating(course.reviews)}
						text={`${course.reviews.length} reviews`}
					/>
					<Card.Text as="h3">
						{formatPrice(course.price.amount)}
					</Card.Text>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default CourseCard;
