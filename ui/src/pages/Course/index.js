import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CourseDetail from '../../components/Cards/CourseDetail';
import CourseCard from '../../components/Cards/ExtendedVerticalCourseCard';
import { H1 } from '../../components/Foundation';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getCourse } from '../../actions';

const StyledCourseContainer = styled.div`
	width: 100%;
	padding: 2rem 10rem 0rem 10rem;
	margin-right: auto;
	margin-left: auto;
`;
const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
`;

const StyledTitle = styled(H1)`
	margin-bottom: 2rem;
`;
const CourseCardContainer = styled.div`
	width: 25%;
`;

const CourseDetailContainer = styled.div`
	width: 75%;
`;

const Course = ({ match }) => {
	const courseId = match.params.id;
	const { courseDetail } = useSelector(state => state);
	const { course, loading, errors } = courseDetail;

	const dispatch = useDispatch();

	useEffect(() => {
		if (courseId) {
			dispatch(getCourse(courseId));
		}
	}, [dispatch, courseId]);

	return (
		<Container className="mt-5" fluid>
			{loading && <Loader />}
			{errors && <Message variant="danger">{errors}</Message>}
			{course && (
				<StyledCourseContainer>
					<StyledTitle>{course.title}</StyledTitle>
					<StyledContainer>
						<CourseCardContainer>
							<CourseCard variant="extendedVertical" {...course} />
						</CourseCardContainer>
						<CourseDetailContainer>
							<CourseDetail {...course}></CourseDetail>
						</CourseDetailContainer>
					</StyledContainer>
				</StyledCourseContainer>
			)}
		</Container>
	);
};

export default Course;
