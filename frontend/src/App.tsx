import { useEffect, useState } from "react";
import "./App.css";
import CourseList from "./components/CourseList";
import NewCourse from "./components/NewCourse";
import CoursesContextProvider from "./store/courses-context";

function App() {
  const [courses, setCourses] =  useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoursesHandler();
  }, []);

  const fetchCoursesHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/v1/courses");
      if (!response.ok) {
        throw new Error('something went wrong here!');
      }
      const data = await response.json();
      setCourses(data);
    } catch(err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <CoursesContextProvider>
      <button onClick={fetchCoursesHandler}>Fetch courses</button>
      <NewCourse />
      {!isLoading && <CourseList courseList={courses} />}
      {!isLoading && !error && <p>No courses found!</p>}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </CoursesContextProvider>
  );
}

export default App;
