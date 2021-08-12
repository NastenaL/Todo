import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from 'src/app/todos/models/todo.model';

@Component({
  selector: 'todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  // TODO: Refactor to getters and rename to visibleTodos$, isNoTodo$, etc.
  public readonly visibleTodos$: Observable<TodoModel[]> = this.todoService.getVisibleTodos();
  public readonly isNoTodo$: Observable<boolean> = this.todoService.getIsNoTodo();
  public readonly isAllTodosSelected$: Observable<boolean> = this.todoService.getIsAllTodosSelected();
  public readonly mainControl: FormControl = new FormControl('');
  public editingId: string | null = null;

  constructor(private readonly todoService: TodoService) {}

  public onToggleAllTodos(): void {
    this.todoService.toggleAll(this.mainControl.value);
  }

  public onEditingId(editingId: string | null):void {
    this.editingId = editingId;
  }

  public getIsEditing(todo : TodoModel): boolean{
    return this.editingId === todo.id;
  }
}
