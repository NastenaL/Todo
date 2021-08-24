import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {

  public currentTodos = this.todoService.getVisibleTodos();
  public readonly toggleAll: FormControl = new FormControl('');
  
  constructor(private readonly todoService: TodoService) {}
  
  get isTodoListEmpty(): Observable<boolean>
  {
    return this.todoService.getIsNoTodo;
  } 
  
  public onToggleAllTodos(): void {
    this.todoService.onToggleAllTodos(this.toggleAll.value);
  }

  private test: string;
  public onEditingId(editingId: string):void {
   this.todoService.setEditingId(editingId);
   this.test = editingId;
  }

  public removeTodo(deleteId: string): void {
    this.todoService.removeTodo(deleteId);
  }

  public changeTodo(newText: string): void {
    this.todoService.changeText(this.test, newText);
  }

  public toggleTodo(id: string){
    this.todoService.toggleTodo(id);
  }
}
