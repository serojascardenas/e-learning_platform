import CourseCardFilter from '../Cards/CourseCardFilter';
import { FilterResultWrapper } from './StyledComponents';

const FilterResult = ({ filterCourses }) => (
	<FilterResultWrapper>
		{filterCourses === null || filterCourses === undefined ? (
			<></>
		) : (
			filterCourses.map((course, index) => {
				let filterCourses = [];
				if (index < 5) {
					filterCourses.push(
						<CourseCardFilter course={course}></CourseCardFilter>
					);
				}
				return filterCourses;
			})
		)}
	</FilterResultWrapper>
);

export default FilterResult;
