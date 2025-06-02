import { Component, inject, OnInit } from '@angular/core';
import { Student } from 'src/shared/models/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-piping',
  templateUrl: './piping.component.html',
  styleUrls: ['./piping.component.scss']
})
export class PipingComponent implements OnInit {
  private _studentService: StudentService = inject(StudentService);

  students: Student[] = [];
  totalMarks: number = 0;

  filterDropdown: any[] = [
    { label: 'none', active: true },
    { label: 'female', active: false },
    { label: 'male', active: false },
  ]
  filterLabel: string = 'none';

  /* totalStudents: Promise<any> = new Promise<any>((resolve, reject) => { // a resolve, és a reject is callback függvény
    setTimeout(() => { // a setTimeout első argumentuma egy anonym callback function  
      resolve(this.students.length);
    }, 2000);
  }); */

  totalStudents!: Promise<number>;

  ngOnInit(): void {
    this.students = this._studentService.students;
    this.totalMarks = this._studentService.totalMarks;

    this.totalStudents = this.getTotalNumberOfStudents();
  }

  onFilterChange(index = 0) {
    this.students = this._studentService.students;
    this.filterDropdown.forEach(f => f.active = false);
    this.filterDropdown[index].active = true;
    this.filterLabel = this.filterDropdown[index].label;
  }

  onFilterChange2(index: number) {
    this.filterDropdown.forEach(f => f.active = false);
    this.filterDropdown[index].active = true;
    this.filterLabel = this.filterDropdown[index].label;
    this.students = this._studentService.filterStudentByGender(this.filterLabel);
  }

  createNewUser() {
    this._studentService.createNewStudent('Steven Static', 'male', new Date('2000-01-01'), 'mba', 500, 2000);
    this.totalStudents = this.getTotalNumberOfStudents();
  }

  getTotalNumberOfStudents(): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.students.length);
      }, 2000);
    });
  }
}
