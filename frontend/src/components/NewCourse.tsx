import React, { useRef, useContext } from "react";
import classes from "./NewCourse.module.css";
import { CoursesContext } from "../store/courses-context";

const NewCourse: React.FC = (props) => {
  const courseCtx =  useContext(CoursesContext);

  const courseNameInputRef = useRef<HTMLInputElement>(null);
  const coursePointsInputRef = useRef<HTMLInputElement>(null);
  const courseDescriptionInputRef = useRef<HTMLInputElement>(null);
  const coursePriceInputRef = useRef<HTMLInputElement>(null);


  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredCourseName = courseNameInputRef.current!.value;
    const enteredCoursePoints = coursePointsInputRef.current!.value;
    const enteredDescription = courseDescriptionInputRef.current!.value;
    const enteredCoursePrice = coursePriceInputRef.current!.value;

    if(enteredCourseName.trim().length === 0 || 
      enteredCoursePrice == null ||
      enteredDescription.trim().length === 0 || 
      enteredCoursePoints === null) {
      return;
    }

    const courseData = {
      name: enteredCourseName,
      points: +enteredCoursePoints,
      description: enteredDescription,
      price: +enteredCoursePrice
    }

    courseCtx.addCourse(courseData);

  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="courseName">Course name</label>
      <input type="text" id="courseName" ref={courseNameInputRef} />

      <label htmlFor="courseDescription">Course description</label>
      <input type="text" id="courseDescription" ref={courseDescriptionInputRef} />

      <label htmlFor="coursePoints">Course points</label>
      <input type="number" id="coursePoints" ref={coursePointsInputRef} />

      <label htmlFor="coursePrice">Course price</label>
      <input type="number" id="coursePrice" ref={coursePriceInputRef} />

      <button>Add course</button>
    </form>
  );
}

export default NewCourse;