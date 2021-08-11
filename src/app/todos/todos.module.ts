import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TodosHeaderComponent, TodoComponent,TodoListComponent, TodosContainer, TodoRoutingModule, FooterComponent} from 'src/app/todos/index'

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
