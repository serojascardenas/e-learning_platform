/* eslint-disable react/prop-types */
import React from 'react';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { addDefaultSrc } from './utils';
import Icon from '../Icons';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	width: 20rem;
	margin-top: 0.5rem;
`;
const ExtendedVerticalCourseCard = ({ cover_image, attributes }) => {
	console.log(`cover_image: ${cover_image}`);
	return (
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

				<StyledButton type="submit" variant="primary">
					Añadir a la cesta
				</StyledButton>
				<StyledButton type="submit" variant="primary">
					Comprar ahora
				</StyledButton>
			</Card.Body>
		</Card>
	);
};

export default ExtendedVerticalCourseCard;
