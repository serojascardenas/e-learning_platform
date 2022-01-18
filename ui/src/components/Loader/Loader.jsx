import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
	<Spinner
		animation='border'
		role='status'
		style={{
			width: '6rem',
			height: '6rem',
			margin: 'auto',
			display: 'block',
		}}
	>
		<span className="sr-only">Loading...</span>
	</Spinner>
);

export default Loader;
