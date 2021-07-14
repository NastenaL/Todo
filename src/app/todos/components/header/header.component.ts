import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public text: string = '';
  public todoControl: FormControl = new FormControl('');

  // TODO: Make property as readonly if you will not mutate it
  // TODO: Make names matched: todoService and TodosService
  constructor(private todoService: TodoService) {}

  // TODO: Refactor to usage ReactiveFormModule instead https://angular.io/guide/forms-overview
  public changeText(event: Event): void {
    console.log(this.todoControl);
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  public addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
