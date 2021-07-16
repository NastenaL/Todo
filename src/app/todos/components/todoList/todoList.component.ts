import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.Type';

@Component({
  selector: 'app-todos-list',
  // TODO: Use kebab case instead https://angular.io/guide/styleguide#component-selectors
  templateUrl: './todoList.component.html',
})
export class TodoListComponent {
  public visibleTodos$: Observable<TodoType[]>;
  public isNoTodo$: Observable<boolean>;
  public isAllTodosSelected$: Observable<boolean>;
  public mainControl: FormControl = new FormControl('');
  public editingId: string | null = null;

  constructor(private readonly todoService: TodoService) {
    // TODO: Move into properties declaration. Like public readonly isAllTodosSelected$ = this.todoService.someProp$
    this.isAllTodosSelected$ = this.todoService.getIsAllTodosSelected();
    this.isNoTodo$ = this.todoService.getIsNoTodo();

    // TODO: Move into service
    this.visibleTodos$ = combineLatest([
      this.todoService.todos$,
      this.todoService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoType[], FilterEnum]) => {
        if (filter == FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter == FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  public onToggleAllTodos(): void {
    this.todoService.toggleAll(this.mainControl.value);
  }

  // TODO: Add response type
  public setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
