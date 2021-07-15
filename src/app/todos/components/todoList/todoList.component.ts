import { Component } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import {FormControl} from '@angular/forms';

import { TodoService } from "../../services/todo.service";
import { TodoInterface } from "../../types/todo.interface";
import { map } from "rxjs/operators";
import { FilterEnum } from "../../types/filter.enum";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todoList.component.html',
})

export class TodoListComponent {
  public visibleTodos$: Observable<TodoInterface[]>;
  public isNoTodo$: Observable<boolean>;
  public isAllTodosSelected$: Observable<boolean>;
  public mainControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {
    this.isAllTodosSelected$ = this.todoService.getIsAllTodosSelected();
    this.isNoTodo$ = this.todoService.getIsNoTodo();

    this.visibleTodos$ = combineLatest([
      this.todoService.todos$,
      this.todoService.filter$]
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
