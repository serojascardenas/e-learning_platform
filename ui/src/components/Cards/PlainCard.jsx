import React from 'react';
import { concatInstructors, formatPrice } from '../../utils';
import { Button, H2 } from '../Foundation';

import {
	StyledPlainCard,
	PlainCardContentType,
	PlainCardTitle,
	Preview,
	PreviewLink,
	PlainCardInfo,
	PlainCardProgressWrapper,
	PlainCardProgress,
	PlainCardProgressText,
	PlainCardInfoText,
	PlainCardButton,
} from './StyledComponents';

const PlainCard = ({
	id,
	title,
	description,
	instructors,
	showProgress = false,
	price,
}) => {
	return (
		<StyledPlainCard >
			<Preview>
				<PlainCardContentType>Curso</PlainCardContentType>
				<PlainCardTitle>{title}</PlainCardTitle>
				<PreviewLink to={`courses/${id}`}>Ver detalles</PreviewLink>
			</Preview>
			<PlainCardInfo>
				{showProgress && (
					<PlainCardProgressWrapper>
						<PlainCardProgress>
							<PlainCardProgressText>4/9 Challenges</PlainCardProgressText>
						</PlainCardProgress>
					</PlainCardProgressWrapper>)}
				<h6>{concatInstructors(instructors)}</h6>
				<H2>{formatPrice(price.amount)}</H2>
				<PlainCardInfoText>{description}</PlainCardInfoText>
				<PlainCardButton>Agregar a la cesta</PlainCardButton>
			</PlainCardInfo>
		</StyledPlainCard>
	);
};

export default PlainCard;