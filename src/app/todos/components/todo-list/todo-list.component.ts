import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  public onEditingId(editingId: string):void {
   this.todoService.setEditingId(editingId);
  }

  public removeTodo(deleteId: string): void {
    this.todoService.removeTodo(deleteId);
  }
  
/*

  public toggleTodo(): void {
    this.todoService.toggleTodo(this.currentTodo.id);
  }
  */
}
