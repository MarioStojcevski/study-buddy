import { useState } from "react";
import "./App.css";
import CourseList from "./components/CourseList";
import NewCourse from "./components/NewCourse";
import Course from "./models/course";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourseHandler = (courseData: {name: string, points: number, description: string, price: number}) => {
    const newCourse = new Course(Math.random(), courseData.name, courseData.points, courseData.description, courseData.price);
    setCourses((prevCourses) => {
      return prevCourses.concat(newCourse);
    })
  }

  return (
    <div>
      <NewCourse onAddCourse={addCourseHandler} />
      <CourseList courses={courses} />
    </div>
  );
}

export default App;
