import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// TODO: Use index.ts barrel for import from components
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component';
import { TodoListComponent } from 'src/app/todos/components/todoList/todoList.component';
import { TodosContainer } from 'src/app/todos/components/todosContainer/todosContainer.component';
import { TodoRoutingModule } from 'src/app/todos/todos-routing.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    TodosContainer,
    HeaderComponent,
    TodoListComponent,
    TodoComponent,
    FooterComponent,
  ],
  imports: [CommonModule, TodoRoutingModule, FormsModule, ReactiveFormsModule],
  // TODO: Check if we really need to export RouterModule
  exports: [RouterModule],
})
export class TodosModule {}
