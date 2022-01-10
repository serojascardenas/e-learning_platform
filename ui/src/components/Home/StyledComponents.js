import styled from "styled-components/macro";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px;
`;

const FilterCourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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

const FilterResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
`;
export {
  HomeContainer,
  FilterCourseContainer,
  FilterWrapper,
  FilterFormWrapper,
  FilterResultWrapper,
};
