import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-templatedrivenform',
  templateUrl: './templatedrivenform.component.html',
  styleUrls: ['./templatedrivenform.component.scss']
})
export class TemplatedrivenformComponent implements AfterViewInit {
  @ViewChild('registrationForm') form!: NgForm;
  @ViewChild('addr') addressGroup!: any;

  firstName: string = 'Thomas Mosdoni';
  lastName: string = '';
  dob: string = '';
  email: string = '';
  isAgreed: boolean = false;

  genderOptions: any[] = [
    {id: 'check-male', label: 'male', value: 'male'},
    {id: 'check-female', label: 'female', value: 'female'},
    {id: 'check-other', label: 'prefer not to say', value: 'nosay'},
  ];

  phoneNumbers: any[] = [
    {id: 1, value: '+36501234567'},
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      // this.form.control.disable();
    }, 0);
  }

  protected tracker = (index: number, value: any) => value.id;

  addPhoneNumber() {
    const lastID = this.phoneNumbers[this.phoneNumbers.length -1].id;
    this.phoneNumbers = [...this.phoneNumbers, {id: lastID + 1, value: ''}]; // Új referenciát adunk
  }

  removePhoneNumber(phoneID: string) {
    const removeIndex = this.phoneNumbers.findIndex(phonenumber => phonenumber.id == phoneID);
    this.phoneNumbers.splice(removeIndex, 1);
  }

  generateUsername() {
    let uname = (this.firstName.slice(0, 3) + this.lastName.slice(0, 3) + (new Date(this.dob)).getFullYear()).toLowerCase();
    // this.form.controls['username'].setValue(uname);
    this.form.form.patchValue({'username': uname});
  }

  submit() {
    console.log('submitted: ', this.form);
    console.log('address: ', this.addressGroup);
    // this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
      address: {country: 'Japan'}
    });
  }

  protected readonly Number = Number;
}
