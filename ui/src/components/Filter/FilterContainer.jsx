import { useState } from 'react';
import { FilterWrapper, Select, Input, Submit } from './StyledComponents';

const FilterContainer = ({ 
	handleFilterSubmit,
}) => {
	
	const [title, setTitle] = useState('');
	const [instructor, setInstructor] = useState('');
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');

	const filterCourses = e => {
		e.preventDefault();
		handleFilterSubmit({ title, instructor, category, subCategory });
	};

	return (
		<FilterWrapper>
			<form onSubmit={filterCourses}>
				<Input
					placeholder="Nombre del Curso"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<Input
					placeholder="Instructor"
					value={instructor}
					onChange={({ target }) => setInstructor(target.value)}
				/>
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
				>
					Buscar
				</Submit>
			</form>
		</FilterWrapper>
	);
};

export { 
	FilterContainer,
};
