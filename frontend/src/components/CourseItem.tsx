import Course from "../models/course";
import classes from "./CourseItem.module.css";

const CourseItem: React.FC<{ 
  course: Course;
  onRemoveCourse: (id: number) => void 
}> = (props) => {
  return (
    <li className={classes.item} onClick={props.onRemoveCourse.bind(null, props.course.id)}>
      <div>
        <h3>{props.course.name} {props.course.points} pts.</h3>
        <p>{props.course.description} - Price: ${props.course.price}</p>
      </div>
    </li>
  );
}

export default CourseItem;