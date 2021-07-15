import { Component, Input } from "@angular/core";
import { TodoType } from "../../types/todo.Type";

@Component({
  selector: "app-todos-todo",
  templateUrl: "./todo.component.html",
})
export class TodoComponent {
  @Input("todo") todoText: TodoType;
}
