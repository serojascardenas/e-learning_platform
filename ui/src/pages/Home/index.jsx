import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { Container as BaseContainer, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'react-multi-carousel/lib/styles.css';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import CourseCard from '../../components/Cards/VerticalCourseCard';
import PlainCard from '../../components/Cards/PlainCard';
import Footer from '../../components/Footer';
import { responsive } from './carousel-config';

import FilterResult from '../../components/FilterResult/FilterResult';
import { FilterContainer } from '../../components/Filter/FilterContainer';
import { getMediaMinWidth, isEmptyArray } from '../../utils';
import { H1 } from '../../components/Foundation';

import { listCourses, listFilterCourses, listTopCourses } from '../../actions';


const Container = styled(BaseContainer)`
	width: 100%;
	height: 100%;
	padding-top: 2rem;
	
	${getMediaMinWidth('md')} {
		padding: 4rem;
	}
`;

const Home = ({
	location,
}) => {
	const query = new URLSearchParams(location.search);
	const keyword = query.get('search') ?? '';

	const [isFiltering, setIsFiltering] = useState(false);

	const dispatch = useDispatch();

	const { courseList, filteredCourseList, topCourses } = useSelector(state => state);
	
	const { 
		courses, 
		loading, 
		errors, 
	} = courseList;
	
	const {
		courses: top,
		loading: loadingTopCourses,
		errors: errorsTopCourses,
	} = topCourses;
	
	const { 
		filteredCourses, 
		loading: loadingFiltered, 
		errors: errorsFiltered, 
	} = filteredCourseList;

	useEffect(() => {
		dispatch(listCourses(keyword));
		dispatch(listTopCourses());
	}, [dispatch, keyword]);

	const onFilterSubmit = filters => {
		dispatch(listFilterCourses(filters));
	};
	
	return (
		<>
			<Container fluid>
				{!keyword ? 
					(<>
						<H1>Los más populares</H1>
						{loadingTopCourses 
							? <Loader />
							: errorsTopCourses 
								? <Message>{errorsTopCourses}</Message>
								: (
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
										{top && top.map((course, i) => <CourseCard 
											key={i} 
											variant="vertical"
											{...course}
										/>)}
									</Carousel>
								)}
						<>
							<Row className="mt-5 ml-1">
								<H1>Todos los cursos</H1>
							</Row>
							{loading ? (<Loader />)
								: errors ? <Message>{errors}</Message>
									: (
										<>
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
						</>
					</>) 
					: (
						<>
							<Link to="/" className="btn">Volver a Inicio</Link>
							<H1>Resultados por {keyword}</H1>
							{loading ? (<Loader />)
								: errors ? <Message>{errors}</Message>
									: (
										<>
											{isEmptyArray(courses) ? 
												<Message>La búsqueda por {keyword} no arrojó ningún resultado</Message>
												:(<Row>
													{courses.map(course =>(
														<Col className="mb-5" key={course.id} xs={12} md={12} lg={6}> 
															<PlainCard {...course} />
														</Col>
													))}
												</Row>)
											}
										</>
									)}
						</>
					)
				}
				
			</Container>
			{!keyword && <Footer />}
		</>
	);
};

export default Home;
