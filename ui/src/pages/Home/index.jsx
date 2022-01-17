import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CourseCard from '../../components/Cards/CourseCard';
import { getCourses } from '../../actions/courses';

import FilterResult from '../../components/FilterResult/FilterResult';
import { FilterContainer } from '../../components/Filter/FilterContainer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 50px;
`;

const FilterWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-top: 50px;
`;

const FilterFormWrapper = styled.div`
	display: flex;
	width: 25%;
`;

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

const Home = () => {
	const [carouselCourses, setCarouselCourses] = useState([]);
	const [filterCourses, setFilterCourses] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('useeffect>>');
		const fetchData = async () => {
			let courses = await dispatch(getCourses());
			setCarouselCourses(buildCourseItem(courses));
		};
		fetchData();
	}, []);

	const buildCourseItem = (courses) => {
		let items = courses.map((course, index) => {
			// eslint-disable-next-line react/jsx-key
			return <CourseCard course={course}></CourseCard>;
		});
		return items;
	};

	return (
		<Container>
			<Carousel
				swipeable={false}
				draggable={false}
				showDots={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				autoPlay={false}
				autoPlaySpeed={1000}
				keyBoardControl={true}
				customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				deviceType="web"
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				{carouselCourses}
			</Carousel>
			<FilterWrapper>
				<FilterFormWrapper>
					<FilterContainer setFilterCourses></FilterContainer>
				</FilterFormWrapper>
				<FilterResult filterCourses={filterCourses}></FilterResult>
			</FilterWrapper>
		</Container>
	);
};

export default Home;
