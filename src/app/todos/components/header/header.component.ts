// TODO: Remove unused code
import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  text: string = '';

  // TODO: Make property as readonly if you will not mutate it
  // TODO: Make names matched: todoService and TodosService
  constructor(private todoService: TodosService) {}

  // TODO: Refactor to usage ReactiveFormModule instead https://angular.io/guide/forms-overview
  // TODO: Add response type
  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
