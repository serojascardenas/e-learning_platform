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

const CourseCardFilter = ({ 
	id,
	cover_image,
	title,
	instructors,
	reviews,
	price,
}) => {
	return (
		<Card flex_variant="row" dimension="filter">
			<Img src={cover_image} variant="filter" />
			<CardFilterDetail>
				<Link to={`/courses/${id}`}>
					<DetailCourseTittle>{title}</DetailCourseTittle>
				</Link>
				<DetailCourseInstructor>
					{concatInstructors(instructors)}
				</DetailCourseInstructor>
				<DetailCourseScore>
					<Rating value={averageRating(reviews)}/>
				</DetailCourseScore>
				<DetailPriceAndButtons>
					<DetailPrice>
						{price && price.price_string}
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
