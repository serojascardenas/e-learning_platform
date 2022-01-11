import React from 'react';
import CourseCard from '../Cards/CourseCard';
import { courses } from '../../data/courses';
//import { CourseCardWrapper } from "./StyledComponents";
import TouchCarousel, { clamp }  from 'react-touch-carousel';
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC';
import { CarouselContainer } from './CarouselContainer';
import './styles.css';


const CourseCarousel = () => {
	const cardSize = 400;
	const cardPadCount = 3;
	//const carouselWidth = clamp(window.innerWidth, 0, 960);


	const Container = touchWithMouseHOC(CarouselContainer);

	const renderCard = (index, modIndex) => {
		console.log(index);
		console.log(modIndex);
		console.log(courses);
		const course = courses[modIndex];
		return (<CourseCard course={course}></CourseCard>);
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

	/*
			<CourseCardWrapper>
				{courses.map((course, index) => (
					<CourseCard course={course}></CourseCard>
				))}
			</CourseCardWrapper>
		*/
	);
};

export default CourseCarousel;
