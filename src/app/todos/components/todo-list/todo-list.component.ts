import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from 'src/app/todos/models/todo.model';

@Component({
  selector: 'todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {

  get currentTodos(): Observable<TodoModel[]>
  {
    return this.todoService.getVisibleTodos();
  } 
  
  get isTodoListEmpty(): Observable<boolean>
  {
    return this.todoService.getIsNoTodo;
  } 
  
  public readonly toggleAll: FormControl = new FormControl('');
  public editingId: string | null = null;

  constructor(private readonly todoService: TodoService) {}

  public onToggleAllTodos(): void {
    this.todoService.onToggleAllTodos(this.toggleAll.value);
  }

  public onEditingId(editingId: string | null):void {
    this.editingId = editingId;
  }

  public getIsEditing(todo : TodoModel): boolean{
    return this.editingId === todo.id;
  }
}
