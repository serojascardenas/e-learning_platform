import { useState } from 'react';
import { FilterWrapper, Select, Input, Submit } from './StyledComponents';

import { Form, Button, Row, Col } from 'react-bootstrap';

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
			<Form onSubmit={filterCourses}>
				<h4>Filtrar</h4>
				<Form.Group controlId="title">
					<Input
						type="text"
						value={title}
						placeholder="Nombre del curso"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</Form.Group>
				<Form.Group className="mt-2" controlId="instructor">
					<Input
						type="text"
						value={instructor}
						placeholder="instructor"
						onChange={({ target }) => setInstructor(target.value)}
					/>
				</Form.Group>
				<Form.Group className="mt-2">
					<Select value={category}>
						<option value="" hidden>
						Categoría
						</option>
					</Select>
				</Form.Group>
				<Form.Group className="mt-2">
					<Select value={subCategory}>
						<option value="" hidden>
						Tema
						</option>
					</Select>
				</Form.Group>
				<Button
					size='sm'
					className="mt-2"
					type="submit"
					variant="primary"
				>Buscar</Button>
			</Form>
		</FilterWrapper>
	);
};

export { 
	FilterContainer,
};
