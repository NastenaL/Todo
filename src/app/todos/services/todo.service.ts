import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/todos/enums/filter.enum';
import { TodoType } from 'src/app/todos/types/todo.Type';
import { TodoUtil } from 'src/app/todos/util/todo.util';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // TODO: Check and make props private and mark them as readonly
  // TODO: Hide subject within the service and expose only observables as readonly values and public methods for manage updates
  // TODO: Remove $ for all non-observable values/members
  public todos$ = new BehaviorSubject<TodoType[]>([]);
  public filter$ = new BehaviorSubject<Filter>(Filter.all);

  public addTodo(text: string): void {
    // TODO: Move into class constructor
    const newTodo: TodoType = {
      text,
      isCompleted: false,
      id: TodoUtil.getId(),
    };
    // TODO: Move this.todos$.getValue() into private getter and reuse at other places
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  public toggleAll(isCompleted: boolean): void {
    console.log('isCompleted', isCompleted);
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  // TODO: Convert to property
  public getIsAllTodosSelected(): Observable<boolean> {
    // TODO: Use todos observable instead of subject directly
    return this.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
  }

  // TODO: Convert to property
  public getIsNoTodo(): Observable<boolean> {
    return this.todos$.pipe(map((todos) => todos.length === 0));
  }

  public changeText(id: string, text: string): void {
    // TODO: Check and reuse update by id functionality. Could be reused at changeText and changeStatus methods
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  public removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);

    this.todos$.next(updatedTodos);
  }

  // TODO: Check if we can rename according to actual functionality
  // Change status sounds like a general function that will take same status from one to another
  // At the current case, we can rename to completeTodo, or toggleTodo like a original component method name
  public changeStatus(id: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  public getVisibleTodos() : Observable<TodoType[]>{
    return combineLatest([
      this.todos$,
      this.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoType[], Filter]) => {
        if (filter == Filter.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter == Filter.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }
}