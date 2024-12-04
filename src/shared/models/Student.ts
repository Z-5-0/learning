export class Student {
    id: number = 0;
    name: string = '';
    gender: string = '';
    birth: Date = new Date;
    course: string = '';
    marks: number = 0;
    fees: number = 0;

    constructor(
        id: number,
        name: string,
        gender: string,
        birth: Date,
        course: string,
        marks: number,
        fees: number) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.course = course;
        this.marks = marks;
        this.fees = fees;
    }
}