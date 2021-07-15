import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
    public noTodoClass$: Observable<boolean>;
    public activeCount$: Observable<number>;
    public filterEnum = FilterEnum;
    public filter$: Observable<FilterEnum>;

    constructor(private todoService: TodoService){
        this.activeCount$ = this.todoService.todos$.pipe(
            map((todos) => todos.filter((todo) => !todo.isCompleted).length)
        );
        this.noTodoClass$ = this.todoService.todos$.pipe(
        map((todos) => todos.length === 0)
        );
        this.filter$ = this.todoService.filter$;
    }

    public changeFilter(event: Event, filter: FilterEnum): void{
        event.preventDefault();
        this.todoService.filter$.next(filter);
    }
}