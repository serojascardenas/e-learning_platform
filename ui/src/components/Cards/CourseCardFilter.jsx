import React from "react";
import {
  formatDecimal,
  formatPrice,
  addStarsToScore,
} from "../../utils/utilities";

import {
  Card,
  CardSnapshot,
  Snapshot,
  CardFilterDetail,
  DetailCourseTittle,
  DetailCourseInstructor,
  DetailCourseScore,
  DetailPriceAndButtons,
  DetailPrice,
  DetailButtons,
  Icon,
  StarsIcon,
  BeforeButtons,
} from "./StyledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

const CourseCardFilter = (props) => {
  return (
    <Card flex_variant="row" dimension="filter">
      <CardSnapshot variant="filter">
        <Snapshot src={props.course.image} variant="filter" />
      </CardSnapshot>
      <CardFilterDetail>
        <DetailCourseTittle>{props.course.title}</DetailCourseTittle>
        <DetailCourseInstructor>
          {props.course.instructors}
        </DetailCourseInstructor>
        <DetailCourseScore>
          {formatDecimal(props.course.score)}{" "}
          <StarsIcon>{addStarsToScore(props.course.score)}</StarsIcon>
        </DetailCourseScore>
        <DetailPriceAndButtons>
          <DetailPrice>{formatPrice(props.course.price)}</DetailPrice>
          <BeforeButtons></BeforeButtons>
          <DetailButtons>
            <Icon>
              <FontAwesomeIcon icon={faBars} />
            </Icon>
            <Icon>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Icon>
          </DetailButtons>
        </DetailPriceAndButtons>
      </CardFilterDetail>
    </Card>
  );
};

export default CourseCardFilter;
