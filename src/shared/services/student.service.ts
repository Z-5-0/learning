import { Injectable } from "@angular/core";
import { Student } from "../models/Student";

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    students: Student[] = [
        new Student(1, 'Bob Hopper', 'male', new Date('1993-08-12'), 'mba', 340, 1990),
        new Student(2, 'Sarah Rider', 'female', new Date('1989-04-04'), 'dtu', 520, 1200),
        new Student(3, 'Monica Louise', 'female', new Date('1992-07-30'), 'mba', 430, 1570),
        new Student(4, 'Kujan Mahar', 'male', new Date('1990-01-02'), 'vtr', 530, 790),
        new Student(5, 'Billy Whinchester', 'male', new Date('1995-03-23'), 'sll', 380, 1280),
        new Student(6, 'Steven McManec', 'male', new Date('1992-12-05'), 'dtu', 400, 2310),
    ];

    totalMarks: number = 600;

    createNewStudent(
        name: string,
        gender: string,
        birth: Date,
        course: string,
        marks: number,
        fee: number) {
        let id = this.students.length + 1;
        this.students.push(new Student(id, name, gender, birth, course, marks, fee));
    }

    filterStudentByGender(filterBy: string) {
        console.log(filterBy);
        if (filterBy === 'none' || filterBy === '' || !this.students.length) {
            return this.students;
        }

        return this.students.filter(student => student.gender === filterBy); // anonym callback function
    }
}