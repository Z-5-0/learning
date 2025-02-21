import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-m-form-control',
  templateUrl: './m-form-control.component.html',
  styleUrls: ['./m-form-control.component.scss']
})
export class MFormControlComponent implements OnInit {
  termList: string[] = ['1 day', '3 days', '1 week', '1 month'];
  filteredTermList: Observable<string[]> = new Observable<string[]>;

  customerForm = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this._formBuilder.control('', Validators.required),
    dateOfBirth: this._formBuilder.control(new Date(2000, 1, 1), Validators.required),
    gender: this._formBuilder.control('male', Validators.required),
    country: this._formBuilder.control('', Validators.required),
    address: this._formBuilder.control('', Validators.required),
    term: this._formBuilder.control('', Validators.required),
    subsciption: this._formBuilder.control(false),
  });

  sentValues: any = {};

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.filteredTermList = this.customerForm.get('term')!.valueChanges.pipe(
      startWith(''), // OnInit hookban azonnal történik egy értékkibocsátás, üres stringgel történik egy keresés
      map(value => this._filter(value || '')), // meghívja a filter függvényt, ami kiszűri a megfelelő opciókat
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.termList.filter(termList => termList.toLowerCase().includes(filterValue)); // kiszűri azokat a tömbelemeket, amik tartalmazzák a felhasználó által begépelt string-et
  }

  saveCustomer(event: any) {
    event.preventDefault();
    console.log(this.customerForm);
    this.sentValues = this.customerForm.value;
  }

  fillForm() {
    this.customerForm.setValue({
      name: 'Joan McRoy',
      email: 'jomro@loser.com',
      phone: '+36501234567',
      dateOfBirth: new Date(1995, 12, 2),
      gender: 'female',
      country: 'Denmark',
      address: 'Gammel Byvej 94, 3000 Helsingør, Denmark',
      term: '1 week',
      subsciption: true,
    })
  }

  clearForm() {
    this.customerForm.reset();
    /* this.customerForm.setValue({ // ezen a módon pedig fixen beállíthatjuk a "reset" értékeket
      name: '',
      email: '',
      phone: '',
      dateOfBirth: new Date(1995, 12, 2),
      gender: '',
      country: '',
      address: '',
      term: '',
      subsciption: false,
    }) */
  }
}
