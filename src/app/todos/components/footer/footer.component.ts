import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  // TODO: Make selector, filename and class name matched https://angular.io/guide/styleguide#symbols-and-file-names
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public isEmptyList$: Observable<boolean>;
  public activeCount$: Observable<number>;
  public filterEnum = Filter;
  // TODO: Add readonly and remove excessive typing
  public filter$: Observable<Filter> = this.todoService.filter$;

  // TODO: Please, add readonly modifier
  constructor(private todoService: TodoService) {
    // TODO: Move into service level and move to property declaration
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.isEmptyList$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }

  public changeFilter(event: Event, filter: Filter): void {
    //   TODO: Remove by refactoring to routerLink directives
    event.preventDefault();
    // TODO: Encapsulate filter$ manage operations into service
    this.todoService.filter$.next(filter);
  }
}
