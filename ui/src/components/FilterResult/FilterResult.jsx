import CourseCardFilter from '../Cards/CourseCardFilter';
import { courses } from '../../data/courses';
import { FilterResultWrapper } from './StyledComponents';

const FilterResult = () => (
	<FilterResultWrapper>
		{courses.map((course, index) => {
			let filterCourses = [];
			if (index < 5) {
				filterCourses.push(
					<CourseCardFilter course={course}></CourseCardFilter>,
				);
			}
			return filterCourses;
		})}
	</FilterResultWrapper>
);

export default FilterResult;
