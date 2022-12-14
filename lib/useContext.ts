import { createContext } from "react";

interface AppContextInterface {
  currentUser: UserObject | null;
  setCurrentUser: (user: UserObject | null) => void;
  studentGrades: StudentGrade[] | null;
  setStudentGrades: (grades: StudentGrade[] | null) => void;
  courseGrades: CourseGrade[] | null;
  setCourseGrades: (grades: CourseGrade[] | null) => void;
}

const AppCtx = createContext<AppContextInterface | null>(null);

export default AppCtx;
