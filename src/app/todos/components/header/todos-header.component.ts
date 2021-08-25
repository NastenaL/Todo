import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css'],
})

export class TodosHeaderComponent {
  @Output() newItem = new EventEmitter<string>();

  public readonly todoControl: FormControl = new FormControl('');

  public addTodo(): void {
    this.newItem.emit(this.todoControl.value);
    this.todoControl.reset();
  }
}
