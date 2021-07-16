import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  // TODO: Make selector, filename and class name matched https://angular.io/guide/styleguide#symbols-and-file-names
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public noTodoClass$: Observable<boolean>;
  public activeCount$: Observable<number>;
  public filterEnum = FilterEnum;
  public filter$: Observable<FilterEnum>;

  // TODO: Please, add readonly modifier
  constructor(private todoService: TodoService) {
    // TODO: Move into service level and move to property declaration
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    // TODO: Move into property declaration level
    this.filter$ = this.todoService.filter$;
  }

  public changeFilter(event: Event, filter: FilterEnum): void {
    //   TODO: Remove by refactoring to routerLink directives
    event.preventDefault();
    // TODO: Encapsulate filter$ manage operations into service
    this.todoService.filter$.next(filter);
  }
}
