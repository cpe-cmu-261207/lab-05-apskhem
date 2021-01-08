import { GRADES } from "../utils/grades";
import { CREDITS } from "../utils/credits";
import { FC, Reducer, useContext, useReducer } from "react";
import { CourseContext } from "../App";

// interfaces and action types
interface CourseFormProps {
  addCourseHandler: (courseInputData: RegularCourseForm) => void;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

type FormAction = 
  | { type: "change id", value: string }
  | { type: "change name", value: string }
  | { type: "change credit", value: Credit }
  | { type: "change grade", value: Grade }
  | { type: "reset" };

// main function component
const CourseForm: FC<CourseFormProps> = (props) => {

  const course = useContext(CourseContext);

  const courseInputDataInitial: RegularCourseForm = {
    id: "",
    name: "",
    credit: 1,
    grade: "F"
  }

  const [ courseInputData, dispatch ] = useReducer<Reducer<RegularCourseForm, FormAction>>((prevState, action) => {
    switch (action.type) {
      case "change id":
        return { ...prevState, id: action.value };
      case "change name":
        return { ...prevState, name: action.value };
      case "change credit":
        return { ...prevState, credit: action.value };
      case "change grade":
        return { ...prevState, grade: action.value };
      case "reset":
        return { ...courseInputDataInitial };
      default:
        throw new Error("There is no matched action in reducer");
    }
  }, courseInputDataInitial);

  // event handler for setting course id
  const setCourseIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "change id", value: e.target.value });

  // event handler for setting course name
  const setCourseNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "change name", value: e.target.value });

  // validate input form
  const validateInputForm = (courseToValidate: RegularCourseForm): boolean => {
    switch (true) {
      case (!courseToValidate.id): {
        props.setErrorText("define course id!");
        return false;
      }
      case (courseToValidate.id.length !== 6): {
        props.setErrorText("course id must have 6 digits!");
        return false;
      }
      case (isNaN(+courseToValidate.id)): {
        props.setErrorText("course id must be all number digits!");
        return false;
      }
      case (!courseToValidate.name): {
        props.setErrorText("define course name!");
        return false;
      }
      case (course.courseList.some((list) => courseToValidate.id === list.id)): {
        props.setErrorText("duplicated course id!");
        return false;
      }
    }

    props.setErrorText("");
    return true;
  }

  // render credit bar
  const renderCreditList = (): JSX.Element[] => {
    return CREDITS.map((v) => {
      const fn = () => dispatch({ type: "change credit", value: v });
      const c = v === courseInputData.credit ? " sel" : "";

      return <div key={v} className={c} onClick={fn}>{v}</div>
    });
  }

  // render grade bar
  const renderGradeList = (): JSX.Element[] => {
    return GRADES.map((gradePair) => {
      const fn = () => dispatch({ type: "change grade", value: gradePair.name });
      const c1 = gradePair.name.replace("+", "p").toLowerCase() + "-icon";
      const c2 = gradePair.name === courseInputData.grade ? " sel" : "";

      return <div key={gradePair.name} className={c1 + c2} onClick={fn}>{gradePair.name}</div>;
    });
  }

  // handle input data
  const handleInputData = (courseInputData: RegularCourseForm) => {
    if (!validateInputForm(courseInputData)) return;

    dispatch({ type: "reset" });
    props.addCourseHandler(courseInputData);
  }

  // return rendering result
  return (
    <div id="course-create-box">
      <aside>
        <div id="course-input-align-1">
          <aside>
            <input type="text" value={courseInputData.id} placeholder="course id" maxLength={6} onChange={setCourseIdHandler}/>
          </aside>
          <aside>
            <input type="text" value={courseInputData.name} placeholder="course name" onChange={setCourseNameHandler}/>
          </aside>
        </div>
        <div id="course-input-align-2">
          <aside id="create-credit-selector">
            {renderCreditList()}
          </aside>
          <aside id="create-grade-selector">
            {renderGradeList()}
          </aside>
        </div>
      </aside>
      {/* TODO add course input form */}
      <aside id="create-btn" className="flex-center" onClick={() => handleInputData(courseInputData)}>
        <i className="fas fa-plus"></i>
      </aside>
    </div>
  );
};

export default CourseForm;
