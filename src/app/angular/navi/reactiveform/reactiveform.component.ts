import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, debounceTime, map, Observable, of, Subscription, switchMap} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

function rangeValidator(min: number, max: number): ValidatorFn {
  return (control) => {
    if (control.value >= min && control.value <= max) {
      return null;
    }
    return {
      range: {
        min: min,
        max: max,
        actual: control.value,
      }
    };
  };
}

function selectValidator(id: number): ValidatorFn {
  return (control) => {
    console.log(control);
    if (control.value == id) {
      return null;
    }
    return {
      valid: false,
    }
  }
}

function checkboxValidator(gender: string): ValidatorFn {
  return (control) => {
    if (control.value === gender) {
      return {
        errorText: 'Nem biológiai nemet választottál!'
      }
    }
    return null;
  }
}

function emailReservedAsyncValidator(http: HttpClient): AsyncValidatorFn {
  return (control) => { // Külső függvény visszatérési értéke, mivel aszinkron validátor függvénnyel kell visszatérnünk.
    return control.valueChanges.pipe( // Belső függvény visszatérési értéke (egy Observable). Az AsyncValidatorFn-nek mindig egy Observable<any>-t kell visszaadnia, amely vagy egy hibát tartalmazó objektumot, vagy null-t ad vissza, ha nincs hiba.
      debounceTime(500),
      switchMap(() => http.get("https://kodbazis.hu/api/is-email-taken", {
        params: {
          email: control.value
        }
      })),
      map(() => null),
      catchError(() => of({
        reserved: true
      }))
    );
  }
}

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss'],
  animations: [
    trigger('fade', [
      state('true', style({opacity: 1, 'z-index': 5})),
      state('false', style({opacity: 0, 'z-index': -1})),
      transition('true <=> false', animate('.5s ease-in-out')),
    ]),
  ]
})
export class ReactiveformComponent implements OnInit, OnDestroy {
  getSkills() {
    return (this.profileForm.get('skills') as FormArray).controls as FormControl[];
  }

  nameValidator = Validators.compose([
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(20),
  ]);

  profileForm = new FormGroup({
    firstName: new FormControl('', this.nameValidator),
    lastName: new FormControl('', this.nameValidator),
    age: new FormControl(20, [
      Validators.required,
      rangeValidator(18, 100)
    ]),
    mail: new FormControl('', Validators.required, emailReservedAsyncValidator(this.http)),
    position: new FormControl(1, selectValidator(2)),
    gender: new FormControl('female', checkboxValidator('nonbi')),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', [
        Validators.required,
        rangeValidator(1000, 9999)
      ]),
    }),
    skills: new FormArray([
      new FormControl('10 ujjas gépelés'),
      new FormControl('8 ujjas gépelés'),
    ], null),
    isAccepted: new FormControl(false)
  });

  simplerProfileForm = this.formBuilder.group({
    firstName: ['', this.nameValidator],
    lastName: ['', this.nameValidator],
    age: [20, [
      Validators.required,
      rangeValidator(18, 100)
    ]],
    mail: ['', Validators.required, emailReservedAsyncValidator(this.http)],
    position: [1, selectValidator(2)],
    gender: ['female', checkboxValidator('nonbi')],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [
        Validators.required,
        rangeValidator(1000, 9999)
      ]],
    }),
    skills: this.formBuilder.array([
      ['10 ujjas gépelés'],
      ['8 ujjas gépelés'],
    ], null),
    isAccepted: [false]
  });

  positionOptions$: Observable<any> = this.http.get('https://kodbazis.hu/api/positions') as Observable<{
    id: number,
    name: string
  }[]>

  skillsArray: AbstractControl[] = [];

  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    /* this.positionOptions$.subscribe({
      next: (options) => {
        console.log('OP: ', options);
      }
    }) */
  }

  ngOnInit(): void {
    const profileFormValueChangeSubscription = this.profileForm.valueChanges.subscribe(change => {
      console.log('change: ', change);
      this.getError("firstName", "maxlength");
    });

    this.subscriptions = [...this.subscriptions, profileFormValueChangeSubscription];

    //  console.log('address: ', (this.profileForm.get('skills') as FormArray).controls as FormControl[]);
    this.skillsArray = (this.profileForm.get('skills') as FormArray).controls;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getError(path: string, errorName: any) {
    const formControl = (this.profileForm.get(path) as FormControl);

    if (formControl.untouched && formControl.pristine) {
      return;
    }

    return formControl.errors?.[errorName];
  }

  addNewSkill() {
    (this.profileForm.get('skills') as FormArray).push(new FormControl('', Validators.required));
  }

  deleteSkill(index: number) {
    // ((this.profileForm.get('skills') as FormArray).controls as FormControl[]).splice(index); // Ugyanazt csinálja.
    (this.profileForm.get('skills') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log('onSubmit / profileForm: ', this.profileForm);

    this.profileForm.markAllAsTouched();

    if (this.profileForm.valid) {
      return;
    }
  }

  testFunction(variable1: string, variable2: string) {
    return {variable1, variable2};
  }
}
