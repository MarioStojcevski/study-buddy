import Course from "../models/course";
import CourseItem from "./CourseItem";

const CourseList: React.FC<{ courses: Course[] }> = (props) => {
  return (
    <ul>
      {props.courses.map(c => <CourseItem course={c} />)}
    </ul>
  );
}

export default CourseList;