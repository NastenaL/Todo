import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "src/app/todos/types/todo.interface";
import { FilterEnum } from "src/app/todos/types/filter.enum";

@Injectable()
export class TodoService {
  public todos$ = new BehaviorSubject<TodoInterface[]>([]);
  public filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: true,
      // TODO: Looks like util/helper function
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  public toggleAll(isCompleted: boolean): void {
    console.log("isCompleted", isCompleted);
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }
}
