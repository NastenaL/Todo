// TODO: Rename filename to .module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TodosComponent } from "src/app/todos/components/todos/todos.component";
import { TodoComponent } from "src/app/todos/components/todo/todo.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodosService } from "./services/todos.service";
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
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  // TODO: We can actually use providedIn: root instead of direct usage
  providers: [TodosService],
})

export class TodosModule {}
