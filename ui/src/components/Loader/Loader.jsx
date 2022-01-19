import React from 'react';
import { Spinner } from 'react-bootstrap';

const defaultStyle = {
	width: '6rem',
	height: '6rem',
	margin: 'auto',
	display: 'block',
};

const Loader = ({
	style,
}) => (
	<Spinner
		animation='border'
		role='status'
		style={style ?? defaultStyle} 
	>
		<span className="sr-only">Loading...</span>
	</Spinner>
);

export default Loader;
