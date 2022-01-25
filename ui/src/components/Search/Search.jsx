import React from 'react';

import {
	Root,
	SearchInput,
} from './StyledComponents';

const Search = ({
	onInputChange = () => {},
	...rest
}) => (
	<Root>
		<SearchInput 
			onChange={onInputChange}
			type="text"
			placeholder='Buscar Cursos'
			{...rest}
		/>
	</Root>
);

export default Search;
