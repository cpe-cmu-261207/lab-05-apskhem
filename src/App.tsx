import { FC, createContext, useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";
import { GRADES } from "./utils/grades";

// interfaces and contexts
interface AppProps { }

interface CourseContextValue {
  courseList: RegularCourseForm[];
}

export const CourseContext = createContext<CourseContextValue>({ courseList: [] });

// main function component
const App: FC<AppProps> = () => {

  const [ courseList, setCourseList ] = useState<RegularCourseForm[]>([]);
  const [ errorText, setErrorText ] = useState<string>("");

  // on mount
  useEffect(() => {
    const rawData = localStorage.getItem("courseList");
    if (!rawData) return;
    
    const refinedData = JSON.parse(rawData);

    setCourseList(refinedData);
  }, []);

  // save on course update
  useEffect(() => {
    localStorage.setItem("courseList", JSON.stringify(courseList));
  }, [courseList.length]);

  // utils: parse string grade to number grade
  const praseStringGrade = (grade: Grade) => GRADES.find((gradePair) => gradePair.name === grade)?.value ?? null;

  // calculate gpa and return gpa
  const calculateGPA = () => {
    let weight = 0;
    let sumWeight = 0;

    for (const course of courseList) {
      const numGrade = praseStringGrade(course.grade);
      if (numGrade === null) continue;

      weight += course.credit;
      sumWeight += course.credit * numGrade;
    }

    return weight ? sumWeight / weight : 0;
  }

  // calculate weight of all courses in the list
  const calculateWeight = () => courseList.reduce((acc, list) => acc += list.credit, 0);

  // add course on submit
  const addCourse = (...courseInputData: RegularCourseForm[]) => setCourseList([...courseList, ...courseInputData]);

  // on delete course handler
  const onDeleteCourse = (id: string) => setCourseList(courseList.filter((course) => id !== course.id));

  // render course card
  const renderCourseCards = (): JSX.Element[] => {
    return courseList.map((course) => {
      return <CourseCard key={course.id} {...course} onDeleteHandler={onDeleteCourse}/>;
    });
  }

  // return rendering result
  return (
    <>
      <header>
        <li className="head-text">GPA Calculator</li>
      </header>
      <main className="app-container">
        <div className="content-container">
          <aside id="gpa-display-box" className="flex-center">
            <div>
              <li id="gpa-display-pretext">Your GPA is</li>
              <li id="gpa-display-text">{calculateGPA().toFixed(2)}</li>
              <li id="gpa-display-credit">
                {/* TODO display calculated GPA */}
                with total credit of {calculateWeight()} from {courseList.length} {courseList.length === 1 ? "course" : "courses"}
              </li>
            </div>
          </aside>
          <aside id="list-display-box" className="neumorphism-container fansy-drop-shadow">
            <li className="course-header-text">My course list<span id="error-text">{errorText}</span></li>
            <div id="list-container">
              {/* TODO display courses */}
              {renderCourseCards()}
            </div>
            <CourseContext.Provider value={{courseList}}>
              <CourseForm addCourseHandler={addCourse} setErrorText={setErrorText} />
            </CourseContext.Provider>
          </aside>
        </div>
      </main>
      <footer>
        <li>Created by Apisit Ritreungroj &copy; {new Date().getFullYear()}. Lab IV for CPE207, React with TypeScript</li>
      </footer>
    </>
  );
}

export default App;
