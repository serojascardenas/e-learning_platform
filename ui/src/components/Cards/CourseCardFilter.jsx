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
	CardFilterDetail,
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

const CourseCardFilter = ({ course }) => {
	let average = averageRating(course.reviews);

	return (
		<Card flex_variant="row" dimension="filter">
			<CardSnapshot variant="filter">
				<Snapshot src={course.image} variant="filter" />
			</CardSnapshot>
			<CardFilterDetail>
				<DetailCourseTittle>{course.title}</DetailCourseTittle>
				<DetailCourseInstructor>
					{concatInstructors(course.instructors)}
				</DetailCourseInstructor>
				<DetailCourseScore>
					{formatDecimal(average)}{' '}
					<StarsIcon>{addStarsToScore(average)}</StarsIcon>
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
			</CardFilterDetail>
		</Card>
	);
};

export default CourseCardFilter;
