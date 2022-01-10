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
  CardDetail,
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

const CourseCard = (props) => {
  return (
    <Card flex_variant="column" dimension="carousel">
      <CardSnapshot variant="carousel">
        <Snapshot src={props.course.image} variant="carousel" />
      </CardSnapshot>
      <CardDetail>
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
      </CardDetail>
    </Card>
  );
};

export default CourseCard;
