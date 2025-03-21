import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './players';

@Pipe({
  name: 'filter',
})
export class FilterPlayerPipe implements PipeTransform {
  transform(items: Player[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}