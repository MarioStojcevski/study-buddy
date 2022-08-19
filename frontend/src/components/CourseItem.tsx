import Course from "../models/course";
import classes from "./CourseItem.module.css";

const CourseItem: React.FC<{ course: Course }> = (props) => {
  return (
    <li className={classes.item}>
      <div>
        <h3>{props.course.name} {props.course.points} pts.</h3>
        <p>{props.course.description} - Price: ${props.course.price}</p>
      </div>
    </li>
  );
}

export default CourseItem;