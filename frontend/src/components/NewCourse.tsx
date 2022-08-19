import React, { useRef } from "react";
import classes from "./NewCourse.module.css";

const NewCourse: React.FC<{
  onAddCourse: ({}: {
    name: string,
    points: number,
    description: string,
    price: number}) => void
  }> = (props) => {
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

    props.onAddCourse(courseData);

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