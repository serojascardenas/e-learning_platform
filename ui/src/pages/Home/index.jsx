import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions';

const Home = () => {

	const dispatch = useDispatch();

	const { userLogin } = useSelector(state => state)
	const { loading, errors, userInfo } = userLogin;
	console.log(`loading ${loading}`);
	console.log(`errors ${errors}`);
	console.log(`userInfo ${userInfo}`);

	useEffect(() => {
		// dispatch(login('hernan@example.com', 'Melapela34'));
	}, []);

	return (
		<>
			Home Page
			<div>NOTE: This is just an example! on how to fetch data and display it</div>
		</>
	);
};

export default Home;
