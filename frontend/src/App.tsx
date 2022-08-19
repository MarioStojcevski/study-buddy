import "./App.css";
import CourseList from "./components/CourseList";
import NewCourse from "./components/NewCourse";
import CoursesContextProvider from "./store/courses-context";

function App() {
  

  return (
    <CoursesContextProvider>
      <NewCourse />
      <CourseList />
    </CoursesContextProvider>
  );
}

export default App;
