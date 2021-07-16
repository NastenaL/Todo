import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-header',
  // TODO: Make selector, filename and class name matched https://angular.io/guide/styleguide#symbols-and-file-names
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public text: string = '';
  public todoControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {}

  public changeText(): void {
    // TODO: Remove text, since we can already use todoControl control value
    this.text = this.todoControl.value;
  }

  public addTodo(): void {
    // TODO: Refactor to event emitter. By this way we make them Smart and Presentational components.
    // https://angular.io/guide/inputs-outputs#sharing-data-between-child-and-parent-directives-and-components
    // https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
