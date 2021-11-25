import React, { useEffect, useState } from 'react';
import { fetchComponentData } from '../../utils';

const Home = () => {
	const [courses, setCourses] = useState([]);

	const getCoursesData = async () => {
		console.log('fetching data');
		const { data } = await fetchComponentData({
			endpoint: 'api/courses',
		});
		setCourses(data);
	};

	useEffect(() => {
		getCoursesData();
	}, []);

	return (
		<>
			Home Page
			<div>NOTE: This is just an example! on how to fetch data and display it</div>
			{courses && courses.map(({ courseId, courseName }) => (
				<p key={courseId}>
					<span>{courseId}</span> | <span>{courseName}</span>
				</p>
			))}
		</>
	);
};

export default Home;
