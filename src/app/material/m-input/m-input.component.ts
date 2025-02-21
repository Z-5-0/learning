import { afterNextRender, Component, inject, Injector, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-m-input',
  templateUrl: './m-input.component.html',
  styleUrls: ['./m-input.component.scss']
})
export class MInputComponent{
  private _injector = inject(Injector);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  fontSize = '16px';
  firstNameAutofilled: boolean = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();

  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
        console.log(this.autosize);
        this.autosize.placeholder = 'hello';
      },
      {
        injector: this._injector,
      },
    );
  }

  onAutofillLastName(event: any) {

  }
}
