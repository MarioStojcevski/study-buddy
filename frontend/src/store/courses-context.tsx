import React, { useState } from "react";
import Course from "../models/course";

type Props = {
  children: React.ReactNode
}

type CourseContextObj = {
  items: Course[];
  addCourse: (courseData: {
    name: string;
    points: number;
    description: string;
    price: number;
  }) => void;
  removeCourse: (id: number) => void;
};

export const CoursesContext = React.createContext<CourseContextObj>({
  items: [],
  addCourse: (courseData: {
    name: string;
    points: number;
    description: string;
    price: number;
  }) => {},
  removeCourse: (id: number) => {},
});

const CoursesContextProvider: React.FunctionComponent<Props> = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourseHandler = (courseData: {
    name: string;
    points: number;
    description: string;
    price: number;
  }) => {
    const newCourse = new Course(
      Math.random(),
      courseData.name,
      courseData.points,
      courseData.description,
      courseData.price
    );
    setCourses((prevCourses) => {
      return prevCourses.concat(newCourse);
    });
  };

  const removeCourseHandler = (id: number) => {
    setCourses((prevCourses) => {
      return prevCourses.filter((c) => c.id !== id);
    });
  };

  const contextValue: CourseContextObj = {
    items: courses,
    addCourse: addCourseHandler,
    removeCourse: removeCourseHandler,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
