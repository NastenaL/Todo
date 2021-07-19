import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// TODO: Use index.ts barrel for import from components
import { TodosHeaderComponent } from 'src/app/todos/components/header/todos-header.component';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component';
import { TodoListComponent } from 'src/app/todos/components/todoList/todo-list.component';
import { TodosContainer } from 'src/app/todos/components/todosContainer/todosContainer.component';
import { TodoRoutingModule } from 'src/app/todos/todos-routing.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    TodosContainer,
    TodosHeaderComponent,
    TodoListComponent,
    TodoComponent,
    FooterComponent,
  ],
  imports: [CommonModule, TodoRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TodosModule {}
