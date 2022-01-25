/* eslint-disable react/prop-types */
import React from 'react';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { addDefaultSrc } from './utils';
import Icon from '../Icons';
import styled from 'styled-components';
import Rating from '../Rating';
import { averageRating } from '../../utils/utilities';
import { useHistory } from 'react-router-dom';

const StyledButton = styled(Button)`
	width: 20rem;
	margin-top: 0.5rem;
`;

const StyleRatingCard = styled(Card)`
	margin-top: 0.5rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.wine};
	font-size: 2.5rem;
	font-weight: bolder;
`;
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

					<StyledButton
						type="submit"
						variant="primary"
						onClick={addToCartHandler}
					>
						Añadir a la cesta
					</StyledButton>
					<StyledButton type="submit" variant="primary">
						Comprar ahora
					</StyledButton>
				</Card.Body>
			</Card>

			<StyleRatingCard className="h-100">
				<Card.Body>
					{averageRating(reviews)}
					<Rating value={averageRating(reviews)} fontSize="2rem" />
				</Card.Body>
			</StyleRatingCard>
		</div>
	);
};

export default ExtendedVerticalCourseCard;
