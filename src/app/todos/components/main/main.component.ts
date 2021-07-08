import { Component } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { TodoInterface } from "../../types/todo.interface";
import {map} from 'rxjs/operators' 
import {FilterEnum} from "../../types/filter.enum"

@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html'
})

export class MainComponent{
visibleTodos$ : Observable<TodoInterface[]>;

constructor(private todoService: TodosService){
    this.visibleTodos$ = combineLatest(
        this.todoService.todos$,
        this.todoService.filter$
    ).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if(filter == FilterEnum.active){
            return todos.filter(todo => !todo.isCompleted);
        }
        else if(filter == FilterEnum.completed){
            return todos.filter(todo => todo.isCompleted);
        }
        return todos;
    }))
}
}