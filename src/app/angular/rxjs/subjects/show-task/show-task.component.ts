import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from 'src/shared/services/task.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {
  tasks: string[] = ['Task1', 'Task2', 'Task3'];
  taskService: TaskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.createTask.subscribe((taskName) => { // callback function, a taskName a névtelen függvény argomentuma
      console.log('taskName: ', taskName);
      this.tasks.push(taskName);
    })
  }
}
