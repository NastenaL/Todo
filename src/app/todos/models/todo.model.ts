import { TodoUtil } from 'src/app/todos/util/todo.util';

export class TodoModel {
  public id: string;
  public text: string;
  public isCompleted: boolean;
  public isEditing: boolean;

  constructor(text:string){
    this.text = text;
    this.isCompleted =  false;
    this.id =  TodoUtil.getId();
    this.isEditing = false;
  }
}
