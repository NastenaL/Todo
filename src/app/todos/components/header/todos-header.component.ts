import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css'],
})

export class TodosHeaderComponent {
  // TODO: Rename to newItem or addTodo, we don't need "event" postfix, since Output is self explanatory
  @Output() newItemEvent = new EventEmitter<string>();

  // TODO: Check if we can make this property private
  // TODO: Refactor this approach and use control value directly
  public text: string = '';
  // TODO: Check if we can add readonly for this property
  public todoControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {
    // TODO: Always unsubscribe from observables, at place or on component destroy 
    // TODO: Move into separate method, that we will call at ngOnInit
    // TODO: Refactor this approach 
    this.todoControl.valueChanges.subscribe(() =>{
      this.text = this.todoControl.value;
    });
  }

  public addTodo(): void {
    this.newItemEvent.emit(this.text);
    this.todoService.addTodo(this.text);
    this.todoControl.reset();
  }
}
