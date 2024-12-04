import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthFirebaseUser } from 'src/shared/models/AuthFirebaseUser';
import { Task } from 'src/shared/models/Task';
import { ApiService } from 'src/shared/services/api.service';
import { AuthFirebaseService } from 'src/shared/services/auth-firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('taskForm') taskForm!: NgForm;

  private _http: HttpClient = inject(HttpClient);
  private _api: ApiService = inject(ApiService);
  private _router: Router = inject(Router);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  firebaseTasks: Task[] = [];
  priorityAndDropdownValues: any = {};
  selectedTaskIDs: any[] = [];

  isLoading: boolean = true;
  isEdit: boolean = false;
  isCollapsed: boolean = true;
  showToast: boolean = false;

  errorMessage: string | null = null;

  selectedTaskDetailsID: string = '';

  subscriptions: Subscription[] = [];

  naviHelper: boolean = false;

  private _authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);
  firebaseUserIsLoggedIn: boolean = false;

  constructor() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkForIdParam();
      });

    this.checkForIdParam();

    this._router.url.includes('auth:dashboard') ? this.naviHelper = true : this.naviHelper = false;
  }

  ngOnInit(): void {
    const tasksSub = this._api.tasks$.subscribe({
      next: (tasks) => {
        this.firebaseTasks = tasks;
      }
    });

    const apiStateSub = this._api.apiState$.subscribe({ // ha bármilyen API hívásnál sikeresen lefut, itt értesülünk róla
      next: (val) => {
        this.isLoading = val.isLoading;
        this.errorMessage = val.error ? this.setErrorMessage(val.error) : null;
      }
    });

    const authFirebaseUserSub = this._authFirebaseService.firebaseUser$.subscribe({
      next: (user: AuthFirebaseUser | null) => {
        this.firebaseUserIsLoggedIn = user ? true : false; // a lejárat token ellenőrzése még nem történik meg
        this.firebaseTasks = user ? this.firebaseTasks : [];
      }
    })

    this.subscriptions = [...this.subscriptions, tasksSub, apiStateSub, authFirebaseUserSub];

    this.getTasks();
  }

  getTasks() {
    this.isLoading = true;
    this._api.getTasks();
  }

  getTask(id: string | undefined) {
    this._api.getTask(id);
  }

  createTask(form: Task) {
    this.isLoading = true;
    this._api.createTask(form);
    this.onSetDefaultState(); // nyitott az accordion, így mindent alaphelyzetbe állítunk
  }

  deleteTask(id: string | undefined) { // szükséges az undefined, mert a Task classban az id optional parameter
    this.isLoading = true;
    this._api.deleteTask(id);
  }

  deleteAllSelectedTask() {
    this.isLoading = true;
    this._api.deleteAllSelectedTask(this.selectedTaskIDs);
  }

  updateTask(form: Task) {
    this.isLoading = true;
    this._api.updataTask(form);
    this.onSetDefaultState(); // nyitott az accordion, így mindent alaphelyzetbe állítunk
  }

  onDropdownChange(column: string, value: string) {
    this.taskForm.form.patchValue({ [column]: value }); // FormControl értékadás programatikusan
    this.priorityAndDropdownValues[column] = value; // a gombon megjelenő kiválasztott értéket biztosítja
  }

  onChangeSelectedCards(event: any, id: string | undefined) {
    if (this.selectedTaskIDs.includes(id)) {
      this.selectedTaskIDs.splice(this.selectedTaskIDs.indexOf(id), 1);
      return;
    }

    this.selectedTaskIDs.push(id);
  }

  onEditTask(task: Task) {
    this.isCollapsed = false;
    this.isEdit = true;

    Object.keys(task).forEach((key, value) => {
      this.taskForm.form.patchValue(task);
    });

    this.priorityAndDropdownValues['priority'] = task['priority'];
    this.priorityAndDropdownValues['status'] = task['status'];
  }

  onSetDefaultState() {
    this.taskForm.reset();
    this.priorityAndDropdownValues = {};
    this.isCollapsed = true;
    this.isEdit = false;
    this.selectedTaskIDs = [];
  }

  setErrorMessage(status: number): string {
    const messages: { [key: number]: string } = {
      401: `${status} - You do not have permission to perform the action`,
      404: `${status} - Client request could not be found`,
    };

    this.showToast = true;

    return messages[status] || 'Error';
  }

  checkForIdParam() {
    const httpRoute = this._activeRoute.children.find(child => child.outlet === 'http');

    if (httpRoute) {
      httpRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.selectedTaskDetailsID = params.get('id') || '';
        } else {
          this.selectedTaskDetailsID = '';
        }
      });
    } else {
      this.selectedTaskDetailsID = '';
    }
  }

  logout() {
    this._authFirebaseService.onLogout();
    this.onSetDefaultState();
    this.naviHelper = false;
    this._router.navigate(['/', 'angular']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
