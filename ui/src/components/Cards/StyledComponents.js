import styled from 'styled-components/macro';

import { Card as BaseCard } from 'react-bootstrap';
import { getMediaMinWidth } from '../../utils';
import { ClampText, H2, Text, Button } from '../Foundation';
import { AccordionItemHeading } from 'react-accessible-accordion';
import { Link } from 'react-router-dom';

const Card = styled(BaseCard)`
	overflow: auto;
	display: flex;
	flex-direction: row;
	height: 11.5rem;
	width: 25rem;
	background-color: ${({ theme }) => theme.colors.whiteGray};
	border-radius: 10px 10px 10px 10px;
	margin-bottom: 1.5rem;
	box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.15);

	${getMediaMinWidth('sm')} {
		max-height: 13rem;
	}

	${getMediaMinWidth('md')} {
		max-height: 12rem;
	}
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background: transparent;
	position: relative;
	width: 100%;
	height: 100%;
`;

const ImgWrapper = styled.div`
	width: 15rem;
	max-width: 25%;
`;

const Img = styled.img`
	height: 11.4rem;
	width: 6rem;
	object-fit: cover;

	${getMediaMinWidth('sm')} {
		max-height: 13rem;
	}

	${getMediaMinWidth('md')} {
		max-height: 12rem;
	}
`;

const CardDetail = styled.div`
	padding: 0 2rem;
	width: 100%;
	height: 100%;
`;

const CardFilterDetail = styled.div`
	padding: 0.5rem 1rem;
	width: 100%;
	height: 100%;
`;

const DetailCourseTittle = styled(Card.Text)`
	width: 100%;
	max-width: 20rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	height: 24%;
	font-size: 14px;
	font-weight: 900;
`;

const DetailCourseInstructor = styled(Card.Text)`
	width: 100%;
	height: 20%;
	margin-top: 1rem;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	color: ${({ theme }) => theme.colors.black};
	font-size: 14px;
`;

const DetailCourseScore = styled.div`
	height: 20%;
	width: 100%;
`;

const DetailPrice = styled.div`
	position: absolute;
	height: 100%;
	font-size: 16px;
	font-weight: 800;
	color: ${({ theme }) => theme.colors.black};
	width: 50%;
	left: 1rem;
`;

const DetailPriceAndButtons = styled.div`
	width: 100%;
	left: 0;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 20%;
	display: flex;
	flex-direction: row;
`;

const DetailDescription = styled(ClampText)`
	margin: 0;
	margin-top: 1rem;
	max-width: 20rem;
	font-size: 0.75rem;
`;

const DetailButtons = styled.div`
	position: absolute;
	right: 1rem;
	height: 100%;
	text-align: right;
	display: flex;
	flex-direction: row;
`;

const Icon = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
	padding: 0.2rem;
	color: ${({ theme }) => theme.colors.turquoise};

	&:hover {
		filter: brightness(120%);
	}
`;

const CourseCardWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const AddOns = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
`;

const LineSeparator = styled.div`
	width: 80%;
	height: 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.blackened};
	position: absolute;
`;

const CommentHeader = styled.header`
	width: 100%;
	display: flex;
`;

/* CourseDetail styled components */
const StyledCard = styled(BaseCard)`
	margin-bottom: 2rem;
`;

/*ExtendedVerticalCourseCard styled components */
const StyledButton = styled(Button)`
	width: 100%;
	margin-bottom: 0.5rem;
`;

const StyleRatingCard = styled(BaseCard)`
	margin-top: 0.5rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.wine};
	font-size: 2.5rem;
	font-weight: bolder;
`;

const RatingText = styled(Text)`
	color: ${({ theme }) => theme.colors.blackened};
	font-size: 2.25rem;
	opacity: .7;
`;

/*AccordionCard styled component */
const StyledAccordionItemHeading = styled(AccordionItemHeading)`
	background-color: rgba(0, 0, 0, 0.03);
	padding: 0.75rem 1.25rem;
	border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledPanel = styled.div`
	padding: 0.75rem 1.25rem;
`;

/*CommentCard styled components*/
const StyleCommentCard = styled(BaseCard)`
	padding: 0.8rem;
	width: 100%;
`;

const StyledPlainCard = styled.div`
	background: ${({ theme }) => theme.colors.white};
	border-radius: 8px;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
	max-width: 100%;
	overflow: hidden;
	width: 100%;
	display: flex;
	flex-direction: column;

	${getMediaMinWidth('sm')} {
		flex-direction: row;
	}
`;

const PlainCardContentType = styled.h6`
	opacity: .6;
	letter-spacing: 1px;
	color: ${({ theme }) => theme.colors.white};
`;

const PlainCardTitle = styled(ClampText)`
	color: ${({ theme }) => theme.colors.white};
	letter-spacing: 1px;
	font-size: 1.25rem;
	margin: 0.5rem 0 0;

	${getMediaMinWidth('sm')} {
		margin: 0.5rem 0;
		font-size: 1rem;
		font-size: 1rem;
	}
`;

const Preview = styled.div`
	background-color: ${({ theme }) => theme.colors.turquoise};
	color: ${({ theme }) => theme.colors.white};
	padding: 1.75rem;
	width: 100%;
	position: relative;

	${getMediaMinWidth('sm')} {
		width: 15.75rem;
	}
`;

const PreviewLink = styled(Link)`
	color: ${({ theme }) => theme.colors.white};
	font-size: 0.75rem;
	opacity: .6;
	margin-top: 0.5rem;
	text-decoration: none;

	&:hover {
		color: ${({ theme }) => theme.colors.white};
	}

	${getMediaMinWidth('sm')} {
		margin-top: 1.75rem;
	}
`;

const PlainCardInfo = styled.div`
	padding: 1.75rem;
	position: relative;
	width: 100%;

	${H2} {
		margin-top: 1.25rem;
	}
`;

const PlainCardProgressWrapper = styled.div`
	position: absolute;
	top: 1.75rem;
	right: 1.75rem;
	text-align: right;
	width: 150px;
`;

const PlainCardProgress = styled.div`
	background: #ddd;
	border-radius: 3px;
	height: 5px;
	width: 100%;

	&::after {
		content: '';
		border-radius: 3px;
		background: ${({ theme }) => theme.colors.turquoise};
		position: absolute;
		top: 0;
		left: 0;
		height: 5px;
		width: 36%;
	}
`;

const PlainCardProgressText = styled(Text)`
	font-size: 10px;
	opacity: .6;
	letter-spacing: 1px;
	padding-top: 0.25rem;
`;

const PlainCardInfoText = styled(ClampText)`
	font-size: 0.75rem;
	font-weight: bold;
	margin-bottom: 3rem;
`;

const PlainCardButton = styled(Button)`
	width: auto;
	font-size: 0.7rem;
	position: absolute;
	bottom: 1rem;
	right: 1.75rem;
	letter-spacing: 1px;
	padding: 10px 15px;

	${getMediaMinWidth('sm')} {
		font-size: 0.75rem;
	}
`;

export {
	Card,
	CardContent,
	Img,
	ImgWrapper,
	CardDetail,
	CardFilterDetail,
	DetailCourseInstructor,
	DetailDescription,
	DetailCourseTittle,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailPrice,
	DetailButtons,
	Icon,
	CourseCardWrapper,
	AddOns,
	LineSeparator,
	CommentHeader,
	RatingText,
	StyledCard,
	StyledButton,
	StyleRatingCard,
	StyledAccordionItemHeading,
	StyledPanel,
	StyleCommentCard,
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
};
