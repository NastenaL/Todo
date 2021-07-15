import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { TodoInterface } from "src/app/todos/types/todo.interface";
import { FilterEnum } from "src/app/todos/enums/filter.enum";
import {TodoUtil} from 'src/app/todos/util/todo.util'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos$ = new BehaviorSubject<TodoInterface[]>([]);
  public filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: true,
      id: TodoUtil.getId(),
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

  public getIsAllTodosSelected() : Observable<boolean>{
    return this.todos$.pipe(map((todos) => todos.every((todo) => todo.isCompleted)));
  }

  public getIsNoTodo() : Observable<boolean>{
    return this.todos$.pipe(map((todos) => todos.length === 0));
  }
}
