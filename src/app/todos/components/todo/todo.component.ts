import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../models/todo.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;
  @Output() deleteId = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<string>();
  @Output() statusItem = new EventEmitter<string>();
  
  public editingId: string = "";
  public editingText = new FormControl();
  
  ngOnInit(): void {
    this.editingText.valueChanges;

    this.editingText.setValue(this.todo.text);
  }

  public setTodoInEditMode(): void {
    this.editingId = this.todo.id;
  }

  public deleteItem(){
    this.deleteId.emit(this.todo.id);
  }

  public edit(){
    this.editItem.emit(this.editingText.value);
    this.editingId = "";
  }

  public toggleTodo(){
    this.statusItem.emit(this.todo.id);
  }
}
