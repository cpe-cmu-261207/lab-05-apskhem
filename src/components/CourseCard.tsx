import { FC, Component } from "react";

interface CourseListProps extends RegularCourseForm {
  onDeleteHandler: (id: string) => void;
}

const CourseCard: FC<CourseListProps> = ({ id, name, credit, grade, onDeleteHandler }) => {
  return (
    <div className="course-list">
      <aside className="course-name-container">
        <div>
          <li className="course-name">{name}</li>
          <li className="course-id">{id}</li>
        </div>
      </aside>
      <aside className="course-grade-contaienr">
        <li className="course-grade">{grade}
          <sub className="course-credit">{credit}</sub>
        </li>
      </aside>
      <aside className="flex-center">
        <i className="fas fa-times course-delete-icon" onClick={() => onDeleteHandler(id)}></i>
      </aside>
    </div>
  );
}

export default CourseCard;