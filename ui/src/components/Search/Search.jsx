import React from 'react';
import { useHistory } from 'react-router-dom';

import {
	Root,
	SearchInput,
} from './StyledComponents';

const Search = ({
	...rest
}) => {
	const history = useHistory();

	const submitHandler = keyword => {
		if (keyword.trim()) {
			history.push({
				pathname: '/',
				search: `?search=${keyword}`,
			});
		} else {
			history.push('/');
		}
	};

	return (
		<Root>
			<SearchInput 
				className="search-box"
				onChange={e => submitHandler(e.target.value)}
				type="text"
				placeholder='Buscar Cursos...'
				{...rest}
			/>
		</Root>
	);
};

export default Search;
