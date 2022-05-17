import { Row, Col } from 'react-bootstrap';
import CourseCard from '../Cards/HorizontalCourseCard';
import { FilterResultWrapper } from './StyledComponents';

const FilterResult = ({ 
	filterCourses, 
}) => (
	<FilterResultWrapper>
		<Row>
			{filterCourses && filterCourses.map((course, index) => (
				<Col key={index} sm={12} md={6} lg={6} xl={4}>
					<CourseCard 
						variant="horizontal" {...course} 
					/>
				</Col>
			))}
		</Row>
	</FilterResultWrapper>
);

export default FilterResult;
