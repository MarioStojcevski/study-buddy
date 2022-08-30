import CourseItem from "./CourseItem";
import { CoursesContext } from "../store/courses-context";
import classes from "./CourseList.module.css";
import { useContext } from "react";

const CourseList: React.FC<{
  courseList: any[]
}> = (props) => {
  const coursesCtx = useContext(CoursesContext);
  console.log(props.courseList)
  
  return (
    <ul className={classes["course-list"]}>
      {coursesCtx.items.map((c) => (
        <CourseItem
          key={c.id}
          course={c}
          onRemoveCourse={coursesCtx.removeCourse.bind(null, c.id)}
        />
      ))}
    </ul>
  );
};

export default CourseList;
