import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.Type';

@Component({
   // TODO: Make selector, filename and class name matched https://angular.io/guide/styleguide#symbols-and-file-names
  selector: 'app-todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  // TODO: Refactor to getters and rename to visibleTodos$, isNoTodo$, etc.
  public readonly visibleTodos$: Observable<TodoType[]> = this.todoService.getVisibleTodos();
  public readonly isNoTodo$: Observable<boolean> = this.todoService.getIsNoTodo();
  public readonly isAllTodosSelected$: Observable<boolean> = this.todoService.getIsAllTodosSelected();
  // TODO: Check if we can make this property readonly
  public mainControl: FormControl = new FormControl('');
  public editingId: string | null = null;

  constructor(private readonly todoService: TodoService) {}

  public onToggleAllTodos(): void {
    this.todoService.toggleAll(this.mainControl.value);
  }

  public setEditingId(editingId: string | null):void {
    this.editingId = editingId;
  }
}
