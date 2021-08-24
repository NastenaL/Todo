import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../models/todo.model';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoModel;
  // We can interpret this event emitter like a simple html element event, like click, change and so on.
  @Output() editingId: EventEmitter<string> =
    new EventEmitter<string>();

@Output() delete = new EventEmitter<string>();

  public editingText = new FormControl();

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    const arr =  combineLatest([this.editingText.valueChanges, this.editingText.statusChanges]).subscribe((r) => console.log(r));
    this.editingText.valueChanges;

    this.editingText.setValue(this.todo.text);
  }

  public setTodoInEditMode(): void {
    this.editingId.emit(this.todo.id);
  }

public deleteItem(){
  this.delete.emit(this.todo.id);
}

public toggleTodo(){
console.log("toggle");
}

  public changeTodo(): void {
    console.log("change");
    // TODO: Please, revisit this approach, and move changeTodo into parent and manage finish editing at that level
    this.todoService.changeText(this.todo.id, this.editingText.value);
    this.editingId.emit("");
  }
}
