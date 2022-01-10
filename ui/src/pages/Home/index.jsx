import React from 'react';
import styled from 'styled-components';

import CourseCarousel from '../../components/Carousel/CourseCarousel';
import FilterResult from '../../components/FilterResult/FilterResult';
import { FilterContainer } from '../../components/Filter/FilterContainer';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FilterFormWrapper = styled.div`
  display: flex;
  width: 25%;
`;

const Home = () => {

	return (
		<Container>
			<CourseCarousel></CourseCarousel>
			<FilterWrapper>
				<FilterFormWrapper>
					<FilterContainer></FilterContainer>
				</FilterFormWrapper>
				<FilterResult></FilterResult>
			</FilterWrapper>
		</Container>
	);
};

export default Home;
