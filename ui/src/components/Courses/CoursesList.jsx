import { ListGroup } from 'react-bootstrap';

import CourseItem from './CourseItem';

const CoursesList = ({
	courses,
}) => (

	<ListGroup>
		{
			courses.map((course, i) => (
				<CourseItem key={i} course={course} />
			))
		}
	</ListGroup>

);

export default CoursesList;