import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public text: string = '';
  public todoControl: FormControl = new FormControl('');

  constructor(private readonly todoService: TodoService) {}

  public changeText(): void {
    this.text = this.todoControl.value;
  }

  public addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
