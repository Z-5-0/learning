import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './players';
import { Student } from 'src/shared/models/Student';

@Pipe({
  name: 'filter',
})
export class FilterPlayerPipe implements PipeTransform {
  transform(items: Student[], searchText: string): any[] { // Player[] volt, de hibára futott
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}