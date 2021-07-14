import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: Use lazyLoading for TodosModule
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
