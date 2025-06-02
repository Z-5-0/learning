import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../models/Student";

@Pipe({
    name: 'filterBy',
    pure: true
})

export class FilterPipe implements PipeTransform {
    transform(list: Student[], filterBy: string) { // a Student[] típus meghatározza, hogy csak ilyen típust fogadhat, szóval nem lesz általánosan használható a pipe listák szűrésére
        // console.log(list, filterBy)
        if (filterBy === 'none' || filterBy === '' || !list.length) {
            return list;
        }

        return list.filter(student => student.gender === filterBy); // anonym callback function
    }
}