import {Component} from "@angular/core";
import {StatusSelector} from "./status-selector";
import {AppState} from "../interfaces/AppState";
import {Store} from "@ngrx/store";

import * as Rx from "rxjs/Rx";
import {archive} from "../actions/todos";
import {filterByText} from "../actions/filters";

@Component({
    selector: 'menubar',
    directives: <any>[ StatusSelector ],
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
          <input type="text" placeholder="Filter by text" #text (input)="updateFilterText$.next(text.value)"> &nbsp;&nbsp;
          <status-selector></status-selector>
        </div>
        <a (click)="archive$.next()" class="archive">Archive (<strong>{{getTodosLength(todos | async) - getRemainingTasksLength(todos | async)}}</strong>)</a>
      </div>
    `
})
export class Menubar {

    todos;

    getTodosLength = (v) => v ? v.length : 0;
    getRemainingTasksLength = (v) => v ? v.filter(t => !t.done).length : 0;

    archive$ = new Rx.Subject()
        .map(() => archive());
    
    updateFilterText$ = new Rx.Subject()
        .map((text) => filterByText(text));

    constructor(store: Store<AppState>) {
        this.todos = store.select('todos');

        Rx.Observable.merge(
            this.archive$,
            this.updateFilterText$
        )
            .subscribe(store.dispatch.bind(store));
    }
}