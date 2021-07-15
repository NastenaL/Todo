import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { TodoType } from "src/app/todos/types/todo.Type";
import { FilterEnum } from "src/app/todos/enums/filter.enum";
import {TodoUtil} from 'src/app/todos/util/todo.util'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos$ = new BehaviorSubject<TodoType[]>([]);
  public filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    const newTodo: TodoType = {
      text,
      isCompleted: false,
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

  public changeText(id: string, text: string): void{
  const updatedTodos = this.todos$.getValue().map((todo) => {
    if(todo.id === id){
      return{
        ...todo,
        text,
      };
    }
    return todo;
  });
  this.todos$.next(updatedTodos);
  }

  public removeTodo(id: string):void{
    const updatedTodos = this.todos$.getValue().filter((todo) => todo.id !== id);

    this.todos$.next(updatedTodos);
  }
}
