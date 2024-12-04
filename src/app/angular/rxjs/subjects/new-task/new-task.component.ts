import { Component, inject } from '@angular/core';
import { TaskService } from 'src/shared/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  newTask: string = '';
  taskService: TaskService = inject(TaskService);

  onCreateNewTask() {
    this.taskService.onCreateTask(this.newTask);
    this.newTask = '';
  }
}
