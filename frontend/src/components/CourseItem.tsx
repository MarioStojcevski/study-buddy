import Course from "../models/course";

const CourseItem: React.FC<{ course: Course }> = (props) => {
  return (
    <li>
      <div>
        <h3>{props.course.name} {props.course.points} pts.</h3>
        <p>{props.course.description} - Price: ${props.course.price}</p>
      </div>
    </li>
  );
}

export default CourseItem;