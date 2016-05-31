import {Component} from "@angular/core";
import {TodoService} from "../services/todo.service";
import {StatusSelector} from "./status-selector";

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
          <strong>{{getRemainingTasksLength()}}</strong> of <strong>{{getTodosLength()}} </strong>remaining
        </span>
        <div>
          <input type="text" placeholder="Filter by text" #text (input)="textChange(text.value)"> &nbsp;&nbsp;
          <status-selector></status-selector>
        </div>
        <a (click)="archive()" class="archive">Archive (<strong>{{getTodosLength() - getRemainingTasksLength()}}</strong>)</a>
      </div>
    `
})
export class Menubar {
    getTodosLength = () => this._todoService.getTodosLength();
    getRemainingTasksLength = () => this._todoService.getRemainingTasksLength();

    constructor(private _todoService: TodoService) {}

    archive() {
        this._todoService.archive();
    }
    
    textChange(val) {
        console.log('oninput');
        this._todoService.textChange(val);
    }
}