import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { Container as BaseContainer, Col, Row } from 'react-bootstrap';

import 'react-multi-carousel/lib/styles.css';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import CourseCard from '../../components/Cards/VerticalCourseCard';
import { listCourses, listFilterCourses } from '../../actions';

import FilterResult from '../../components/FilterResult/FilterResult';
import { FilterContainer } from '../../components/Filter/FilterContainer';
import { isEmptyArray } from '../../utils';

const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
	padding: 4rem;
`;

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
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
	const [isFiltering, setIsFiltering] = useState(false);

	const dispatch = useDispatch();

	const { courseList, filteredCourseList } = useSelector(state => state);
	const { 
		courses, 
		loading, 
		errors, 
	} = courseList;
	const { 
		filteredCourses, 
		loading: loadingFiltered, 
		errors: errorsFiltered, 
	} = filteredCourseList;

	useEffect(() => {
		dispatch(listCourses());
	}, [dispatch]);

	const onFilterSubmit = filters => {
		dispatch(listFilterCourses(filters));
	};

	return (
		<Container fluid>
			{loading ? (<Loader />)
				: errors ? <Message>{errors}</Message>
					: (
						<>
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
								{courses && courses.map((course, i) => (
									<CourseCard 
										key={i} 
										variant="vertical"
										{...course}
									/>
								))}
							</Carousel>
							<Row className="mt-5 ml-1">
								<h1>Buscar Cursos</h1>
							</Row>
							<Row>
								<Col md={12} xs={12} lg={3} className="my-4">
									<FilterContainer 
										handleFilterSubmit={onFilterSubmit}
										setIsFiltering={setIsFiltering}
									/>
								</Col>
								<Col md={12} xs={12} lg={9} className="my-4">
									{loadingFiltered && <Loader />}
									{!loadingFiltered && isFiltering && isEmptyArray(filteredCourses) && <Message variant="info">Tu busqueda no ha arrojado resultados</Message>}
									{errorsFiltered && <Message variant="danger">{errorsFiltered}</Message>}
									{!loadingFiltered && <FilterResult filterCourses={isEmptyArray(filteredCourses) ? courses : filteredCourses} />}
								</Col>
							</Row>
						</>
					)}
		</Container>
	);
};

export default Home;
