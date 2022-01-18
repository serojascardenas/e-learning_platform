import React from 'react';
import {
	concatInstructors,
	averageRating,
} from '../../utils/utilities';

import {
	Card,
	Img,
	CardFilterDetail,
	DetailCourseTittle,
	DetailCourseInstructor,
	DetailCourseScore,
	DetailPriceAndButtons,
	DetailPrice,
	DetailButtons,
	Icon,
} from './StyledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Rating from '../Rating';

const CourseCardFilter = ({ course }) => {
	return (
		<Card flex_variant="row" dimension="filter">
			<Img src={course.cover_image} variant="filter" />
			<CardFilterDetail>
				<Link to={`/courses/${course.id}`}>
					<DetailCourseTittle>{course.title}</DetailCourseTittle>
				</Link>
				<DetailCourseInstructor>
					{concatInstructors(course.instructors)}
				</DetailCourseInstructor>
				<DetailCourseScore>
					<Rating value={averageRating(course.reviews)}/>
				</DetailCourseScore>
				<DetailPriceAndButtons>
					<DetailPrice>
						{course.price === null ? '' :  course.price.price_string}
					</DetailPrice>
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
