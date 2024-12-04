import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeactivateComponent } from 'src/shared/guards/auth-guard.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements DeactivateComponent {
  typeSwitcher: 'default' | 'test-outlet' | 'navi-outlet' = 'default';
  router: ActivatedRoute = inject(ActivatedRoute);

  firstName: string = '';
  lastName: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  constructor() {
    this.typeSwitcher = this.router.snapshot.data['typeSwitcher'] || 'default';
  }

  onSubmit() {
    this.isSubmitted = true;
    this.firstName = '';
    this.lastName = '';
    this.message = '';
  }

  canExit() {
    if ((this.firstName || this.lastName || this.message) && !this.isSubmitted) {
      return confirm('Contact form have unsaved changes. Do you want to exit?');
    } else {
      return true;
    }
  }
}
