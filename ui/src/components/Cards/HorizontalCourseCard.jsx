import React from 'react';
import { useHistory } from 'react-router-dom';

import { concatInstructors, averageRating } from '../../utils/utilities';

import {
	AddOns,
	Card,
	CardContent,
	Img,
	ImgWrapper,
	CardFilterDetail,
	DetailCourseTittle,
	DetailCourseInstructor,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailDescription,
	DetailPrice,
	DetailButtons,
	Icon,
} from './StyledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import { addDefaultSrc } from './utils';

const HorizontalCourseCard = ({
	children,
	id,
	cover_image,
	title,
	description,
	instructors,
	reviews,
	price,
	showDescription = false,
	showActionButtons = true,
}) => {
	const history = useHistory();

	const addToCartHandler = () => {
		history.push(`/cart/${id}`);
	};

	const openCourseDetail = () => {
		history.push(`/courses/${id}`);

	};

	return (
		<Card>
			<ImgWrapper>
				<Img src={cover_image} onError={addDefaultSrc} />
			</ImgWrapper>
			<CardContent>
				<CardFilterDetail>
					<Link to={`/courses/${id}`}>
						<DetailCourseTittle>{title}</DetailCourseTittle>
					</Link>
					{showDescription && description && (
						<DetailDescription by={3}>{description}</DetailDescription>
					)}
					{instructors && (
						<DetailCourseInstructor>
							{concatInstructors(instructors)}
						</DetailCourseInstructor>
					)}
					{reviews && (
						<DetailCourseScore>
							<Rating value={averageRating(reviews)} />
						</DetailCourseScore>
					)}
					<DetailPriceAndButtons>
						<DetailPrice showActionButtons={showActionButtons}>
							{price && price.price_string}
						</DetailPrice>
						{showActionButtons && (
							<DetailButtons>
								<Icon onClick={openCourseDetail}>
									<FontAwesomeIcon icon={faBars} />
								</Icon>
								<Icon onClick={addToCartHandler}>
									<FontAwesomeIcon icon={faShoppingCart} />
								</Icon>
							</DetailButtons>
						)}
						<AddOns>{children}</AddOns>
					</DetailPriceAndButtons>
				</CardFilterDetail>
			</CardContent>
		</Card>
	);
};

export default HorizontalCourseCard;
