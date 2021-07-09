import { Component } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { TodoInterface } from "../../types/todo.interface";
import { map } from "rxjs/operators";
import { FilterEnum } from "../../types/filter.enum";

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
// TODO: Rename according to module scope. Ex. TodosMain or TodoList, etc.
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  // TODO: Use is/has for booleans
  // TODO: We don't need Class postfix here
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;

  // TODO: Make names matched: todoService and TodosService
  // TODO: Make property as readonly if you will not mutate it
  constructor(private todoService: TodosService) {
    // TODO: Move this observables into todoService
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this.todoService.todos$.pipe(
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

  // TODO: use "on" as prefix for event handlers
  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }
}
