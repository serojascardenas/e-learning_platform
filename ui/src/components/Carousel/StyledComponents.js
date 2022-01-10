import styled from 'styled-components/macro';

/*const NonPassiveTouchTarget = styled.div`
  position: relative;
  height: 300px;
  max-width: 960px;
  margin: 0 auto;
  overflow: hidden;
  touch-action: pan-y;
  background-color:yellow;
`;*/

const CarouselTrack = styled.div`
  display: flex;
  height: 100%;
  background-color:red;
`;

const CarouselPaginationWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const CarouselPagination = styled.ol`
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 200px;
  padding: 0;
`;

export {
  //NonPassiveTouchTarget,
  CarouselTrack,
  CarouselPaginationWrapper,
  CarouselPagination,
};
