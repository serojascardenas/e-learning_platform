import React, { useState, useEffect } from 'react';
import CourseCard from '../Cards/CourseCard';
import TouchCarousel, { clamp } from 'react-touch-carousel';
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC';
import { CarouselContainer } from './CarouselContainer';

import './styles.css';

const CourseCarousel = ({ courses }) => {
	const cardSize = 400;
	const cardPadCount = 3;

	useEffect(() => {
	}, [courses]);
	const Container = touchWithMouseHOC(CarouselContainer);

	const renderCard = (index, modIndex) => {
		const course = courses[modIndex];
		return <CourseCard course={course}></CourseCard>;
	};

	return (
		<TouchCarousel
			component={Container}
			cardSize={cardSize}
			cardCount={courses.length}
			cardPadCount={cardPadCount}
			loop={true}
			// autoplay={enableAutoplay ? 2e3 : false}
			renderCard={renderCard}
		/>
	);
};

export default CourseCarousel;
