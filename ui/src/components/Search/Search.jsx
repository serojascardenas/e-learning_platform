import React from 'react';

import {
	Form,
} from 'react-bootstrap';

const Search = ({
	onInputChange = () => {},
	...rest
}) => (
	<Form
		inline
	>
		<Form.Control
			autoComplete="off"
			size="sm"
			type="text"
			name="q"
			className="mr-sm-1 "
			{...rest}
		></Form.Control>
	</Form>
);

export default Search;
