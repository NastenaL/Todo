import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TodosComponent } from "src/app/todos/components/todos/todos.component";
import { TodoComponent } from "src/app/todos/components/todo/todo.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoService } from "./services/todo.service";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from "@angular/common";

// TODO: Move into separate file (like app-routing.module)
const routes: Routes = [
  {
    path: "",
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  // TODO: We can actually use providedIn: root instead of direct usage
  providers: [TodoService],
})

export class TodosModule {}
