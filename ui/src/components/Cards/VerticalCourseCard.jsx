/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import {
	formatPrice,
	concatInstructors,
	averageRating,
} from '../../utils/utilities.js';

import Rating from '../Rating';
import { addDefaultSrc } from './utils';

const VerticalCourseCard = ({
	id,
	cover_image,
	title,
	instructors,
	reviews,
	price,
}) => {
	return (
		<Card className="h-100">
			<Link to={`/courses/${id}`}>
				<Card.Img
					style={{ height: '15rem' }}
					src={cover_image || '/images/not-found.jpg'}
					onError={addDefaultSrc}
					variant="top"
				/>
			</Link>
			<Card.Body>
				<Link to={`/courses/${id}`}>
					<Card.Title as="div">
						<strong>{title}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="p">
					{concatInstructors(instructors)}
					<Rating
						value={averageRating(reviews)}
						text={`${reviews.length} reviews`}
					/>
					<Card.Text as="h3">{formatPrice(price.amount)}</Card.Text>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default VerticalCourseCard;
