import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TodosContainer } from "src/app/todos/components/todosContainer/todosContainer.component";
import { TodoComponent } from "src/app/todos/components/todo/todo.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoService } from "./services/todo.service";
import { TodoListComponent } from "./components/todoList/todoList.component";
import { CommonModule } from "@angular/common";

// TODO: Move into separate file (like app-routing.module)
const routes: Routes = [
  {
    path: "",
    component: TodosContainer,
  },
];

@NgModule({
  declarations: [TodosContainer, HeaderComponent, TodoListComponent, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  // TODO: We can actually use providedIn: root instead of direct usage
  providers: [TodoService],
})

export class TodosModule {}
