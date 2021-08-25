import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
})
export class TodosContainer {

  constructor(private readonly todoService: TodoService) {}

  public addTodo(todoControl: string):void{
    
    this.todoService.addTodo(todoControl);
    todoControl = "";
  }
}
