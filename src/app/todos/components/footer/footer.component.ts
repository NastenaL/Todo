import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Filter } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public isEmptyList$: Observable<boolean> = this.todoService.isEmptyList;
  public activeCount$: Observable<number> = this.todoService.activeCount;
  public filterEnum = Filter;
  public readonly filter = this.todoService.filter;

  constructor(
    private readonly todoService: TodoService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router
    ) {
  }

public ngAfterViewInit(){
  this.activateRoute.url.subscribe(console.log);
  this.router.events.subscribe(console.log);
}

  public changeFilter(event: Event, filter: Filter): void {
    //   TODO: Remove by refactoring to routerLink directives
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
