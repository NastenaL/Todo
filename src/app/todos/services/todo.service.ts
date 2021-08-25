import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Filter } from 'src/app/todos/enums/filter.enum';
import { TodoModel } from 'src/app/todos/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = new BehaviorSubject<TodoModel[]>([]);
  public readonly filter = new BehaviorSubject<Filter>(Filter.All);
  private readonly editingId = new BehaviorSubject<string>("");
  
public setEditingId(id: string): void{
  this.editingId.next(id);
}

  public addTodo(text: string): void {
    const newTodo: TodoModel =  new TodoModel(text);
    const updatedTodos = [...this.todosItems, newTodo];
    this.todos.next(updatedTodos);
  }

  public onToggleAllTodos(isCompleted: boolean): void {
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

  public updateById(id: string, text: string|null): TodoModel[]{
    return this.todosItems.map((todo) => {
      if (todo.id === id) {
        if(text !== null){
          return {
            ...todo,
            text
          };
        }
        else{
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          };
        }
      }
      return todo;
    });
  }

  public changeText(id: string, text: string): void {
    const updatedTodos = this.updateById(id, text);
    this.todos.next(updatedTodos);
  }

  public removeTodo(id: string): void {
    const updatedTodos = this.todos
      .getValue()
      .filter((todo) => todo.id !== id);

    this.todos.next(updatedTodos);
  }

  public toggleTodo(id: string): void {
    const updatedTodos = this.updateById(id, null);
    this.todos.next(updatedTodos);
  }

  public getVisibleTodos() : Observable<TodoModel[]>{
     const visibleTodos$ = combineLatest([
      this.todos,
      this.filter
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
      
      return combineLatest([visibleTodos$, this.editingId]).pipe(map(
        ([todos, editingId]) =>{
        return todos.map(todo => {
          return {
            ... todo,
            isEditing: todo.id === editingId
          }
        })
      }
    ));
  }

  public setFilter(filter: Filter): void{
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