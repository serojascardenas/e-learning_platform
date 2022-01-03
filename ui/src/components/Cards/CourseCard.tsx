import React from "react";
import { Course } from "../../models/Course";

import {
  Card,
  CardSnapshot,
  Snapshot,
  CardDetail,
  DetailCourseTittle,
  DetailCourseInstructor,
  DetailCourseScore,
  DetailPriceAndButtons,
  DetailPrice,
  DetailButtons,
  Icon,
  StarsIcon,
} from "./StyledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";

import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

interface CourseItem {
  course: Course;
}

const CourseCard = (props: CourseItem) => {
  console.log(`Couse ${props.course}`);

  const formatDecimal = (value: number): string => {
    return (Math.round(value * 100) / 100).toFixed(2);
  };
  const formatPrice = (value: number): string => {
    return `$ ${formatDecimal(value)}`;
  };

  const addStarsToScore = (value: number) => {
    let stars = 1;
    let halfStar = 0;
    let icons = [];
    const maxStars = 5;

    if (value % 1 === 0) {
      stars = value;
    } else {
      stars = value - (value % 1);
      halfStar = 1;
    }

    for (let i = 1; i <= stars; i++) {
      icons.push(<FontAwesomeIcon icon={faStar} />);
    }

    if (halfStar > 0) {
      icons.push(<FontAwesomeIcon icon={faStarHalf} />);
    }

    let diffStars = maxStars - value;
    if (diffStars - (diffStars % 1) > 0) {
      for (let i = 0; i < diffStars; i++) {
        icons.push(<FontAwesomeIcon icon={faRegularStar} />);
      }
    }

    return <StarsIcon>{icons}</StarsIcon>;
  };

  return (
    <Card>
      <CardSnapshot>
        <Snapshot
          src="https://picsum.photos/seed/picsum/200/300"
        />
      </CardSnapshot>
      <CardDetail>
        <DetailCourseTittle>{props.course.title}</DetailCourseTittle>
        <DetailCourseInstructor>
          {props.course.instructors}
        </DetailCourseInstructor>
        <DetailCourseScore>
          {formatDecimal(props.course.score)}{" "}
          {addStarsToScore(props.course.score)}
        </DetailCourseScore>
        <DetailPriceAndButtons>
          <DetailPrice>{formatPrice(props.course.price)}</DetailPrice>
          <DetailButtons>
            <Icon>
              <FontAwesomeIcon icon={faBars} />
            </Icon>
            <Icon>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Icon>
          </DetailButtons>
        </DetailPriceAndButtons>
      </CardDetail>
    </Card>
  );
};

export default CourseCard;
