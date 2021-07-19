import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css'],
})

export class TodosHeaderComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  public text: string = '';
  public todoControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {
    this.todoControl.valueChanges.subscribe(() =>{
      this.text = this.todoControl.value;
    });
  }

  public addTodo(): void {
    // TODO: Refactor to event emitter. By this way we make them Smart and Presentational components.
    // https://angular.io/guide/inputs-outputs#sharing-data-between-child-and-parent-directives-and-components
    // https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
    this.newItemEvent.emit(this.text);
    console.log(this.newItemEvent);
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
