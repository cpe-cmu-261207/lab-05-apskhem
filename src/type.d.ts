type Grade = "A" | "B+" | "B" | "C+" | "C" | "D+" | "D" | "F" | "W";
type Credit = 1 | 2 | 3;

interface RegularCourseForm {
    id: string;
    name: string;
    credit: Credit;
    grade: Grade;
}