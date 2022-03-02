import React from 'react';
import { formatString } from '../../utils';
import { H2 } from '../Foundation';

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
	category,
	sub_category,
	price,
}) => {
	return (
		<StyledPlainCard >
			<Preview>
				<PlainCardContentType>Curso</PlainCardContentType>
				<PlainCardTitle by={5}>{title}</PlainCardTitle>
				<PreviewLink to={`courses/${id}`}>Ver detalles</PreviewLink>
			</Preview>
			<PlainCardInfo>
				{showProgress && (
					<PlainCardProgressWrapper>
						<PlainCardProgress>
							<PlainCardProgressText>4/9 Challenges</PlainCardProgressText>
						</PlainCardProgress>
					</PlainCardProgressWrapper>)}
				<h6>{formatString(category, 'name')}</h6>
				<H2>{formatString(sub_category, 'name')}</H2>
				<PlainCardInfoText>{description}</PlainCardInfoText>
				<PlainCardButton>Agregar a la cesta</PlainCardButton>
			</PlainCardInfo>
		</StyledPlainCard>
	);
};

export default PlainCard;