import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.Type';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  // TODO: Remove excessive bindingPropertyName property. Try to always keep names matched https://angular.io/guide/styleguide#avoid-aliasing-inputs-and-outputs
  @Input('todo') todo: TodoType;
  @Input('isEditing') isEditing: boolean;
  // TODO: Remove excessive typing. We can use simple new EventEmitter<T>(); for it
  // TODO: Please, rename to editingId, editIdChange.
  // We can interpret this event emitter like a simple html element event, like click, change and so on.
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter<string | null>();

  // TODO: Replace to FormControl
  public editingText: string = '';

  // TODO: Please, add readonly modifier
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  public setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todo.id);
  }

  // TODO: Please, move removeTodo, toggleTodo and changeTodo handling to parent component
  // TODO: By this way we make them Smart and Presentational components.
  // https://angular.io/guide/inputs-outputs#sharing-data-between-child-and-parent-directives-and-components
  // https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
  public removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  public toggleTodo(): void {
    this.todoService.changeStatus(this.todo.id);
  }

  public changeText(event: Event): void {
    // TODO: Remove after refactor to form control
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  public changeTodo(): void {
    // TODO: Please, revisit this approach, and move changeTodo into parent and manage finish editing at that level
    this.todoService.changeText(this.todo.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
