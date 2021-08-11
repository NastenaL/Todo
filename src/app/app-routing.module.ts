import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosContainer } from './todos/components/todos-container/todos-container.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./todos/todos.module').then((module) => module.TodosModule),
  },
  {
    path:'active',
    component: TodosContainer
  },
  {
    path:'all',
    component: TodosContainer
  },
  {
    path:'completed',
    component: TodosContainer
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
