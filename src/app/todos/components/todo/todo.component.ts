import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { TodoType } from "../../types/todo.Type";

@Component({
  selector: "app-todos-todo",
  templateUrl: "./todo.component.html",
})
export class TodoComponent implements OnInit{
  @Input("todo") todo: TodoType;
  @Input("isEditing") isEditing: boolean;
  @Output("setEditingId") setEditingIdEvent: EventEmitter<string | null> = new EventEmitter<string | null>();

  public editingText: string = '';

  constructor(private todoService: TodoService){}

  ngOnInit():void{
    this.editingText = this.todo.text;
  }

  public setTodoInEditMode(): void{
    this.setEditingIdEvent.emit(this.todo.id);
  }

  public removeTodo(): void{
    this.todoService.removeTodo(this.todo.id);
  }

  public toggleTodo(): void{
    this.todoService.changeStatus(this.todo.id);
  }

  public changeText(event: Event):void{
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  public changeTodo():void{
    this.todoService.changeText(this.todo.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
