import React, { useEffect, useState } from "react";
import { fetchComponentData } from "../../utils";
import CourseCarousel from "../../components/Carousel/CourseCarousel";
import FilterResult from "../../components/FilterResult/FilterResult";
import { FilterContainer } from "../../components/Filter/FilterContainer";
import {
  HomeContainer,
  FilterWrapper,
  FilterFormWrapper,
} from "../../components/Home/StyledComponents";

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

  return (
    <HomeContainer>
      <CourseCarousel></CourseCarousel>
      <FilterWrapper>
        <FilterFormWrapper>
          <FilterContainer></FilterContainer>
        </FilterFormWrapper>
          <FilterResult></FilterResult>
      </FilterWrapper>
    </HomeContainer>
  );
};

export default Home;
