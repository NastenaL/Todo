import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../enums/filter.enum';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})

export class FooterComponent {
  public readonly activeCount$: Observable<number> = this.todoService.activeCount;
  public readonly filters = [
    {text: Filter.Active, url: '/'+Filter.Active}, 
    {text: Filter.All, url: '/'+Filter.All} ,
    {text: Filter.Completed, url: '/'+Filter.Completed}];

  constructor(private readonly todoService: TodoService) {}

  public setFilter(filter: Filter): void {
    this.todoService.setFilter(filter);
  }
}
