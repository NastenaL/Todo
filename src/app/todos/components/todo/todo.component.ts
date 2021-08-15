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
  @Input() isEditing: boolean;
  // We can interpret this event emitter like a simple html element event, like click, change and so on.
  @Output() editingId: EventEmitter<string | null> =
    new EventEmitter<string | null>();

  public editingText = new FormControl();

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.editingText.setValue(this.todo.text);
  }

  public setTodoInEditMode(): void {
    this.editingId.emit(this.todo.id);
  }

  // TODO: Please, move removeTodo, toggleTodo and changeTodo handling to parent component
  // TODO: By this way we make them Smart and Presentational components.
  // https://angular.io/guide/inputs-outputs#sharing-data-between-child-and-parent-directives-and-components
  // https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
  public removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  public toggleTodo(): void {
    this.todoService.toggleTodo(this.todo.id);
  }

  public changeTodo(): void {
    // TODO: Please, revisit this approach, and move changeTodo into parent and manage finish editing at that level
    this.todoService.changeText(this.todo.id, this.editingText.value);
    this.editingId.emit(null);
  }
}
