import { Component, Input } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";

@Component({
  selector: "app-todos-todo",
  templateUrl: "./todo.component.html",
})
export class TodoComponent {
  // TODO: Check if we need to pass the whole model, since we use only text property
  // TODO: Rename todoProps to todo, or todoText according to comment above 
  @Input("todo") todoProps: TodoInterface;
}
