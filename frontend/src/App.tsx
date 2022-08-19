import "./App.css";
import CourseList from "./components/CourseList";
import Course from "./models/course";

function App() {
  const courses: Course[] = [
    new Course(1, "Learn React", 15, "The react course", 59.99),
    new Course(2, "Learn typescript", 10, "The typescript course", 29.99),
    new Course(3, "Learn Nodejs", 15, "The nodejs course", 60.00)
  ]

  return (
    <div>
      <CourseList courses={courses} />
    </div>
  );
}

export default App;
