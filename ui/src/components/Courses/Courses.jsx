import { Row, Col } from 'react-bootstrap';
import CourseCard from '../Cards/HorizontalCourseCard';
import { CoursesWrapper } from './StyledComponents';

const Courses = ({ 
	showActionButtons = true,
	courses, 
}) => (
	<CoursesWrapper>
		<Row>
			{courses && courses.map((course, index) => (
				<Col key={index} sm={12} md={6} lg={6} xl={4}>
					<CourseCard 
						showActionButtons={showActionButtons}
						variant="horizontal" {...course} 
					/>
				</Col>
			))}
		</Row>
	</CoursesWrapper>
);

export default Courses;