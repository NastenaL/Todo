import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;
  @Output() editingId = new EventEmitter<string>();
  @Output() deleteId = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<string>();
  @Output() statusItem = new EventEmitter<string>();
  
  public newText = new FormControl();
  
  ngOnInit(): void {
    this.newText.valueChanges;
    this.newText.setValue(this.todo.text);
  }

  public setEditMode(): void {
    this.editingId.emit(this.todo.id);
  }

  public deleteItem(){
    this.deleteId.emit(this.todo.id);
  }

  public edit(){
    this.editItem.emit(this.newText.value);
    this.editingId.emit("");
  }

  public toggleTodo(){
    this.statusItem.emit(this.todo.id);
  }
}
