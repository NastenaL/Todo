import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";

import { TodosContainer } from "src/app/todos/components/todosContainer/todosContainer.component";
import { TodoComponent } from "src/app/todos/components/todo/todo.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoListComponent } from "src/app/todos/components/todoList/todoList.component";
import { TodoRoutingModule} from "src/app/todos/todos-routing.module";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [TodosContainer, HeaderComponent, TodoListComponent, TodoComponent, FooterComponent],
  imports: [CommonModule, TodoRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})

export class TodosModule {}
