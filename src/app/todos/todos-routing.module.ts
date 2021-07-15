import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosContainer } from "src/app/todos/components/todosContainer/todosContainer.component";

const routes: Routes = [
    {
      path: "",
      component: TodosContainer,
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
