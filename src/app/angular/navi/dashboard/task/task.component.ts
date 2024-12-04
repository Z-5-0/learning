import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/shared/models/Task';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _api: ApiService = inject(ApiService);

  taskID: string = '';
  taskDetails: Task = {} as Task;

  constructor() {
    this.taskID = this._activeRoute.snapshot.url[1].path;

    this._api.task$.subscribe({
      next: (val) => this.taskDetails = val
    })
  }

  ngOnInit(): void {
    this._api.getTask(this.taskID);
  }
}
