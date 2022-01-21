import React from 'react';

import HorizontalCourseCard from './HorizontalCourseCard';
import VerticalCourseCard from './VerticalCourseCard';

const variants = {
	vertical: VerticalCourseCard,
	horizontal: HorizontalCourseCard,
};

const CourseCard = ({
	variant = 'horizontal',
	...restProps
}) => {
	const Card = variants[variant] ?? variants['horizontal'];
	return(
		<Card {...restProps}/>
	);
};

export default CourseCard;
