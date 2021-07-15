import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
    noTodoClass$: Observable<boolean>;
    activeCount$: Observable<number>;

    constructor(private todoService: TodoService){
        this.activeCount$ = this.todoService.todos$.pipe(
            map((todos) => todos.filter((todo) => !todo.isCompleted).length)
        );
        this.noTodoClass$ = this.todoService.todos$.pipe(
        map((todos) => todos.length === 0)
        );
    }
}