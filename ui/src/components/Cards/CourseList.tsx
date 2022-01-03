import React from "react";
import CourseCard from "./CourseCard";
import { courses } from "../../data/courses";
import {
  CourseCardWrapper
} from "./StyledComponents";

const CourseList = () => {
  return (
    <>
      <CourseCardWrapper>
        {courses.map((course, index) => (
          <CourseCard course={course}></CourseCard>
        ))}
      </CourseCardWrapper>
    </>
  );
};

export default CourseList;
