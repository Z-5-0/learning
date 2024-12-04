import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText: string = 'Having fun';
  searchText2: string = '';
  @Output() searchText2Change: EventEmitter<string> = new EventEmitter<string>();

  @Input() shownInput: 'learning' | 'inputOnly' | 'searchWithButton' | 'viewchildsearch' = 'learning';

  @ViewChild('searchInput', {static: false}) searchInputElementRef!: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(e: any) {
    this.searchText = e.target.value;
  }

  onSearchClick(inputElement: HTMLInputElement) {
    this.searchText2Change.emit(inputElement.value);
  }

  onSearchClickWithViewChild() {
    const inputElementRef = this.searchInputElementRef.nativeElement.value;
    this.searchText2Change.emit(inputElementRef);
  }
}
