import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCourse } from '../../actions';
import CourseDetail from '../../components/Cards/CourseDetail';
import CourseCard from '../../components/Cards/ExtendedVerticalCourseCard';

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

const StyledTitle = styled.h1`
	color: ${({ theme }) => theme.colors.chathamsBlue};
	margin-bottom: 2rem;

`;
const CourseCardContainer = styled.div`
	width: 25%;
`;

const CourseDetailContainer = styled.div`
	width: 75%;
`;

const Course = ({ match, history }) => {
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
		<div>
			{course ? (
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
			) : (
				<></>
			)}
		</div>
	);
};

export default Course;
