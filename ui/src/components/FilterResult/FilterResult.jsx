import { Row, Col } from 'react-bootstrap';
import CourseCardFilter from '../Cards/CourseCardFilter';
import { FilterResultWrapper } from './StyledComponents';

const FilterResult = ({ 
	filterCourses, 
}) => (
	<FilterResultWrapper>
		<Row>
			{filterCourses && filterCourses.map((course, index) => (
				<Col key={index} sm={12} md={6} lg={6} xl={4}>
					<CourseCardFilter course={course}></CourseCardFilter>
				</Col>
			))}
		</Row>
	</FilterResultWrapper>
);

export default FilterResult;
