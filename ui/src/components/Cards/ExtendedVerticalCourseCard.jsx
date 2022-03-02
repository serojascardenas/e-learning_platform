/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { addDefaultSrc } from './utils';
import Icon from '../Icons';
import Rating from '../Rating';
import { averageRating } from '../../utils/utilities';

import { 
	RatingText, 
	StyleRatingCard,
} from './StyledComponents';

import { Button } from '../Foundation';

const ExtendedVerticalCourseCard = ({
	id,
	cover_image,
	attributes,
	reviews,
}) => {
	const history = useHistory();

	const addToCartHandler = () => {
		history.push(`/cart/${id}`);
	};
	return (
		<div>
			<Card className="h-100">
				<Card.Img
					style={{ height: '15rem' }}
					src={cover_image || '/images/not-found.jpg'}
					onError={addDefaultSrc}
					variant="top"
				/>
				<Card.Body>
					<Card.Text as="p">
						<Icon
							variant="hours"
							text={`${attributes.video_content_length} horas`}
						></Icon>
					</Card.Text>
					<Card.Text as="p">
						<Icon
							variant="articles"
							text={`${attributes.num_articles} artículos`}
						></Icon>
					</Card.Text>
					<Card.Text as="p">
						<Icon
							variant="practiceTests"
							text={`${attributes.num_practice_tests} ejercicios prácticos`}
						></Icon>
					</Card.Text>
					{attributes.has_lifetime_access ? (
						<Card.Text as="p">
							<Icon variant="lifetimeAccess" text="Acceso de por vida"></Icon>
						</Card.Text>
					) : (
						<></>
					)}
					{attributes.has_certificate ? (
						<Card.Text as="p">
							<Icon
								variant="hasCertificate"
								text="Certificado de finalización"
							></Icon>
						</Card.Text>
					) : (
						<></>
					)}

					<Container>
						<Row>
							<Col>
								<Button onClick={addToCartHandler}>
									Añadir a la cesta
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button className="mt-2">Comprar ahora</Button>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>

			<StyleRatingCard className="h-100">
				<Card.Body>
					<RatingText>{averageRating(reviews)}</RatingText>
					<Rating value={averageRating(reviews)} fontSize="2rem" />
				</Card.Body>
			</StyleRatingCard>
		</div>
	);
};

export default ExtendedVerticalCourseCard;
