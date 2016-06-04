import {Component} from "@angular/core";
import {TodoService} from "../services/todo.service";
import {StatusSelector} from "./status-selector";
import {AppState} from "../interfaces/AppState";
import {Store} from "@ngrx/store";

@Component({
    selector: 'menubar',
    directives: <any[]>[ StatusSelector ],
    template: `
      <style>
        .archive {
          text-decoration: none;
          color: #fff;
        }
        .archive:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      </style>
      <div id="menubar">
        <span id="todo-count">
          <strong>{{getRemainingTasksLength(todos | async)}}</strong> of <strong>{{getTodosLength(todos | async)}} </strong>remaining
        </span>
        <div>
          <input type="text" placeholder="Filter by text" #text (input)="textChange(text.value)"> &nbsp;&nbsp;
          <status-selector></status-selector>
        </div>
        <a (click)="archive()" class="archive">Archive (<strong>{{getTodosLength(todos | async) - getRemainingTasksLength(todos | async)}}</strong>)</a>
      </div>
    `
})
export class Menubar {

    todos;
    
    getTodosLength = (v) => v ? v.length : 0;
    getRemainingTasksLength = (v) => v ? v.filter(t => !t.done).length : 0;
    

    constructor(store: Store<AppState>, private _todoService: TodoService) {
        this.todos = store.select('todos');
    }

    archive() {
        this._todoService.archive();
    }
    
    textChange(val) {
        this._todoService.textChange(val);
    }
}