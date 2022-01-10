import { courses } from "../../data/courses";
import { clamp } from "react-touch-carousel";
import cx from "classnames";
import {
  CarouselPaginationWrapper,
  CarouselPagination,
} from "./StyledComponents";
import NonPassiveTouchTarget from "./NonPassiveTouchTarget";

const CarouselContainer = (props) => {
  const cardSize = 300;
  const cardPadCount = 3;
  const carouselWidth = clamp(window.innerWidth, 0, 960);
  const {
    cursor,
    carouselState: { active, dragging },
    ...rest
  } = props;
  let current = -Math.round(cursor) % courses.length;
  while (current < 0) {
    current += courses.length;
  }
  // Put current card at center
  const translateX =
    (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;
  return (
    <NonPassiveTouchTarget
    className={cx("carousel-container", {
      "is-active": active,
      "is-dragging": dragging
    })}
  >
    <NonPassiveTouchTarget
      className="carousel-track"
      style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
      {...rest}
    />

      <CarouselPaginationWrapper>
        <CarouselPagination>
          {courses.map((_, index) => (
            <li key={index} className={current === index ? "current" : ""} />
          ))}
        </CarouselPagination>
      </CarouselPaginationWrapper>
    </NonPassiveTouchTarget>
  );
}

export { CarouselContainer };
