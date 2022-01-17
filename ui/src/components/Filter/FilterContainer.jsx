import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterWrapper, Select, Input, Submit } from './StyledComponents';
import { getCourses } from '../../actions/courses';

const FilterContainer = ({ setFilterCourses }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [instructor, setInstructor] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');

	const filterCourses = e => {
		e.preventDefault();
		let filters = { title, instructor, category, subCategory };
		let courses = dispatch(getCourses(filters));
		setFilterCourses(courses);
	};

	return (
		<FilterWrapper>
			<form>
				<Input
					placeholder="Nombre del Curso"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				></Input>
				<Input
					placeholder="Instructor"
					value={instructor}
					onChange={({ target }) => setTitle(target.value)}
				></Input>
				<Select value={category}>
					<option value="" hidden>
						Categoría
					</option>
				</Select>
				<Select value={subCategory}>
					<option value="" hidden>
						Tema
					</option>
				</Select>

				<Submit
					variant="primary"
					type="submit"
					onSubmit={() => filterCourses()}
				>
					Buscar
				</Submit>
			</form>
		</FilterWrapper>
	);
};
export { FilterContainer };
