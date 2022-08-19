import Course from "../models/course";
import CourseItem from "./CourseItem";
import classes from "./CourseList.module.css";

const CourseList: React.FC<{ courses: Course[] }> = (props) => {
  return (
    <ul className={classes["course-list"]}>
      {props.courses.map(c => <CourseItem key={c.id} course={c} />)}
    </ul>
  );
}

export default CourseList;