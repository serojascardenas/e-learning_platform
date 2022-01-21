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
import { H1 } from '../../components/Foundation';

const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
	padding: 4rem;
`;

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 2560 },
		items: 7,
	},
	desktop: {
		breakpoint: { max: 2560, min: 1024 },
		items: 5,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 550 },
		items: 3,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 550, min: 0 },
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
								swipeable={true}
								draggable={true}
								showDots={true}
								responsive={responsive}
								ssr={true} 
								infinite={true}
								autoPlay={true}
								autoPlaySpeed={3000}
								keyBoardControl={true}
								transitionDuration={500}
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
								<H1>Buscar Cursos</H1>
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
