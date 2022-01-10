import { FilterWrapper, Select, Input, Submit } from './StyledComponents';

const FilterContainer = () => (
	<FilterWrapper>
		<Input placeholder="Nombre del Curso"></Input>
		<Input placeholder="Instructor"></Input>
		<Select>
			<option value="" hidden>
        Categoría
			</option>
		</Select>
		<Select>
			<option value="" hidden>
        Tema
			</option>
		</Select>

		<Submit variant="primary" type="submit">
      Buscar
		</Submit>
	</FilterWrapper>
);

export { 
	FilterContainer, 
};
