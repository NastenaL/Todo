import { Component } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import {FormControl} from '@angular/forms';

import { TodoService } from "../../services/todo.service";
import { TodoInterface } from "../../types/todo.interface";
import { map } from "rxjs/operators";
import { FilterEnum } from "../../types/filter.enum";

@Component({
  selector: 'app-todos-main',
  templateUrl: './todoList.component.html',
})

export class TodoListComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  // TODO: Use is/has for booleans
  noTodo$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  public mainControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {
    // TODO: Move this observables into todoService
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodo$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    // TODO: Fix deprecated usage
    this.visibleTodos$ = combineLatest(
      this.todoService.todos$,
      this.todoService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
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
}
