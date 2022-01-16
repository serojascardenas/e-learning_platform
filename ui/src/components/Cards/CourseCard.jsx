/* eslint-disable react/prop-types */
import React from 'react';
import {
	formatDecimal,
	concatInstructors,
	addStarsToScore,
	averageRating,
} from '../../utils/utilities';

import {
	Card,
	CardSnapshot,
	Snapshot,
	CardDetail,
	DetailCourseTittle,
	DetailCourseInstructor,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailPrice,
	DetailButtons,
	Icon,
	StarsIcon,
	BeforeButtons,
} from './StyledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ course }) => {
	let average = averageRating(course.reviews);
	return (
		<Card flex_variant="column" dimension="carousel">
			<CardSnapshot variant="carousel">
				<Snapshot src={course.cover_image} variant="carousel" />
			</CardSnapshot>
			<CardDetail>
				<DetailCourseTittle>{course.title}</DetailCourseTittle>
				<DetailCourseInstructor>{concatInstructors(course.instructors)}</DetailCourseInstructor>
				<DetailCourseScore>
					{formatDecimal(average)} <StarsIcon>{addStarsToScore(average)}</StarsIcon>
				</DetailCourseScore>
				<DetailPriceAndButtons>
					<DetailPrice>
						{course.price === null ? '' : course.price.price_string}
					</DetailPrice>
					<BeforeButtons></BeforeButtons>
					<DetailButtons>
						<Icon>
							<FontAwesomeIcon icon={faBars} />
						</Icon>
						<Icon>
							<FontAwesomeIcon icon={faShoppingCart} />
						</Icon>
					</DetailButtons>
				</DetailPriceAndButtons>
			</CardDetail>
		</Card>
	);
};

export default CourseCard;
