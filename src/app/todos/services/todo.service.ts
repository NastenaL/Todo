import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/todos/enums/filter.enum';
import { TodoModel } from 'src/app/todos/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = new BehaviorSubject<TodoModel[]>([]);
  private readonly filter = new BehaviorSubject<Filter>(Filter.All);
  private readonly editingId = new BehaviorSubject<string>("");
  
  public setEditingId(id: string): void{
    this.editingId.next(id);
  }

  public addItem(text: string): void {
    const newTodo: TodoModel =  new TodoModel(text);
    const currentTodos = [...this.todosItems, newTodo];
    this.todos.next(currentTodos);
  }

  public completedAllItems(isCompleted: boolean): void {
    const currentTodos = this.todosItems.map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos.next(currentTodos);
  }

  public updateItemById(id: string, text: string|null): TodoModel[]{
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

  public updateItemText(id: string, text: string): void {
    const currentTodos = this.updateItemById(id, text);
    this.todos.next(currentTodos);
  }

  public removeItem(id: string): void {
    const currentTodos = this.todos
      .getValue()
      .filter((todo) => todo.id !== id);

    this.todos.next(currentTodos);
  }

  public setItemStatus(id: string): void {
    const currentTodos = this.updateItemById(id, null);
    this.todos.next(currentTodos);
  }

  public getCurrentItems() : Observable<TodoModel[]>{
    const currentTodos$ = combineLatest([
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
      
      return combineLatest([currentTodos$, this.editingId]).pipe(map(
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
  
  private get todosItems(){
    return this.todos.getValue();
  }
}