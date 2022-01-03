import React, { useEffect, useState } from "react";
import { fetchComponentData } from "../../utils";
import CourseList from "../../components/Cards/CourseList";

const Home = () => {
  // const [courses, setCourses] = useState([]);

  // const getCoursesData = async () => {
  // 	console.log('fetching data');
  // 	const { data } = await fetchComponentData({
  // 		endpoint: 'api/courses',
  // 	});
  // 	setCourses(data);
  // };

  // useEffect(() => {
  // 	getCoursesData();
  // }, []);

  return <CourseList></CourseList>;


  
};

export default Home;
