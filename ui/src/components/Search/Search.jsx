import React from 'react';

import {
	Root,
} from './StyledComponents';

const Search = ({
	onInputChange = () => {},
	...restProps
}) => (
	<Root 
		onChange={onInputChange}
		{...restProps}
	/>
);

export default Search;
