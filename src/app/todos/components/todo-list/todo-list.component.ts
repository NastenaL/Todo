import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {

  private id: string;
  public readonly currentItems = this.todoService.getCurrentItems();
  public readonly completedAll = new FormControl('');
  
  constructor(private readonly todoService: TodoService) {}
  
  public completedAllItems(): void {
    this.todoService.completedAllItems(this.completedAll.value);
  }

  public setEditingId(editingId: string):void { 
   this.todoService.setEditingId(editingId);
   this.id = editingId;
  }

  public removeItem(deleteId: string): void {
    this.todoService.removeItem(deleteId);
  }

  public editItem(newText: string): void {
    this.todoService.updateItemText(this.id, newText);
  }

  public setItemStatus(id: string){
    this.todoService.setItemStatus(id);
  }
}
