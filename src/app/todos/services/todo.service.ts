import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/todos/enums/filter.enum';
import { TodoModel } from 'src/app/todos/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = new BehaviorSubject<TodoModel[]>([]);
  public readonly filter = new BehaviorSubject<Filter>(Filter.All);
  private isNoTodo: Observable<boolean>;

  public addTodo(text: string): void {
    const newTodo: TodoModel =  new TodoModel(text);
    const updatedTodos = [...this.todosItems, newTodo];
    this.todos.next(updatedTodos);
  }

  public onToggleAllTodos(isCompleted: boolean): void {
    console.log('isCompleted', isCompleted);
    const updatedTodos = this.todosItems.map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos.next(updatedTodos);
  }

  public get getIsNoTodo(): Observable<boolean> {
    return this.todos.pipe(map((todos) => todos.length === 0));
  }

  @Input() set setIsNoTodo(value: Observable<boolean>) {
    this.isNoTodo = value;
  }

  public changeText(id: string, text: string): void {
    // TODO: Check and reuse update by id functionality. Could be reused at changeText and changeStatus methods
    const updatedTodos = this.todosItems.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos.next(updatedTodos);
  }

  public removeTodo(id: string): void {
    const updatedTodos = this.todos
      .getValue()
      .filter((todo) => todo.id !== id);

    this.todos.next(updatedTodos);
  }

  public toggleTodo(id: string): void {
    const updatedTodos = this.todosItems.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos.next(updatedTodos);
  }

  public getVisibleTodos() : Observable<TodoModel[]>{
    return combineLatest([
      this.todos,
      this.filter,
    ]).pipe(
      map(([todos, filter]: [TodoModel[], Filter]) => {
        if (filter == Filter.Active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter == Filter.Completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  public changeFilter(filter: Filter): void{
    this.filter.next(filter);
  }

  public get activeCount(){
    return this.todos.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
  }

  public get isEmptyList(){
    return this.todos.pipe(
      map((todos) => todos.length === 0)
    );
  }
  
  private get todosItems(){
    return this.todos.getValue();
  }
}