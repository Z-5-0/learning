import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, Observable, startWith, tap } from 'rxjs';

interface User {
  name: string,
  nick: string,
  age: number
}

export interface StateGroup {
  type: string;
  names: string[];
}

@Component({
  selector: 'app-m-autocomplete',
  templateUrl: './m-autocomplete.component.html',
  styleUrls: ['./m-autocomplete.component.scss']
})
export class MAutocompleteComponent implements OnInit, AfterViewInit {
  myControl = new FormControl('');

  options: any[] = [
    'first',
    'second',
    'third',
  ]

  filteredOptions: Observable<string[]> = new Observable<string[]>;

  // --------------------------

  userControl = new FormControl('');

  userOptions = [
    { name: 'Bob', nick: 'Bobby', age: 46 },
    { name: 'Jason', nick: 'J', age: 24 },
    { name: 'Clara', nick: 'Ciar', age: 29 },
  ]
  selectedUser: User = {} as User;
  filteredUserOptions: Observable<User[]> = new Observable<User[]>;

  // --------------------------

  // groupControl = new FormControl('', Validators.requiredTrue);

  @ViewChild('group') group!: MatAutocomplete;
  @ViewChild('autocompleteInput', { read: MatAutocompleteTrigger }) triggerAutocompleteInput!: MatAutocompleteTrigger;

  form = this._formBuilder.group({
    stateGroup: ['', Validators.required],
  });

  groupVehicles: any[] = [
    {
      type: 'Nissan',
      names: ['GT-R', '400Z', 'Skyline'],
    },
    {
      type: 'Honda',
      names: ['Supra', 'Celica', 'Arizona', 'Arkansas'],
    },
    {
      type: 'Toyota',
      names: ['Honda NSX', 'S2000', 'Civic', 'Integra'],
    },
  ];

  groupOptions: Observable<any> = new Observable<any>;

  groupOptionSelectedValue: string = '';

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), // OnInit hookban azonnal történik egy értékkibocsátás, üres stringgel történik egy keresés
      map(value => this._filter(value || '')), // meghívja a filter függvényt, ami kiszűri a megfelelő opciókat
    );

    this.filteredUserOptions = this.userControl.valueChanges.pipe(
      startWith(''), // OnInit hookban azonnal történik egy értékkibocsátás, üres stringgel történik egy keresés
      map((value: any) => {
        // console.log(value);
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterUser(name as string) : this.userOptions.slice();
      }), // meghívja a filter függvényt, ami kiszűri a megfelelő opciókat
    );

    /* this.groupOptions = this.groupControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    ); */

    this.groupOptions = this.form.get('stateGroup')!.valueChanges.pipe( // ha a form-on [formGroup]="stateForm" van
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  ngAfterViewInit(): void {
    // console.log('group: ', this.group);
    // this.group.optionGroups.forEach(f => { // az optionGroups egy QueryList
    // console.log(f); // a 3 db option group-ot listázza
    // });
    // setTimeout(() => {
      // this.triggerAutocompleteInput.openPanel(); // kinyitja az autocomplete input mezőt
    // }, 5000);
  }

  openAutoCompleteInputPanel() {
    setTimeout(() => {
      this.triggerAutocompleteInput.openPanel();
    }, 0)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(user: User): string {
    return user && user.name ? user.nick : '';
  }

  private _filterUser(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.userOptions.filter(option => option.name.toLowerCase().includes(filterValue) || option.age.toString().includes(filterValue));
  }

  onUserSelectionChange(event: any) {
    this.selectedUser = event.option.value;
  }

  onUserInputBlur(event: any) {
    if (JSON.stringify(this.userControl.value) !== JSON.stringify(this.selectedUser)) {
      this.userControl.reset();
      this.selectedUser = {} as User;
    }
  }

  private _filterGroup(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.groupVehicles
      .map(group => ({
        type: group.type,
        names: group.names.filter((name: any) => name.toLowerCase().includes(filterValue))
      }))
      .filter(group => value ? group.names.length > 0 : this.groupVehicles);
  }

  groupOptionSelected(event: any) {
    this.groupOptionSelectedValue = event.option.value;
  }
}
