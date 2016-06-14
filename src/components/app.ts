import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as Rx from "rxjs/Rx";

import {TodoList} from "./todo-list";
import {Menubar} from "./menubar";
import {AppState} from "../interfaces/AppState";
import {addTodo, toggleAll} from "../actions/todos";
import {Todo} from "../models/Todo.model";


@Component({
    selector: 'app',
    directives: <any>[
        TodoList,
        Menubar
    ],
    template: `
      <h1 class="title">Todo App</h1>
      <section id="todoapp">
        <menubar></menubar>
        <div>
          <header id="header">
            <input type="text" id="new-todo" placeholder="What needs to be done?" #input (keyup.enter)="todo$.next(input.value);input.value=''">
          </header>
          <section id="main">
            <input type="checkbox" id="toggle-all" #checkbox (click)="toggleAll$.next(checkbox.checked)">
            <todo-list></todo-list>
          </section>
        </div>
      </section>
      <footer id="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://kgosse.github.io/resumecard" target="_blank">kgosse</a></p>
        <p>Based on <a href="http://todomvc.com" target="_blank">TodoMVC</a></p>
      </footer>
    `
})
export class App {
    todo$ = new Rx.Subject()
        .map((value: string) => ( value.trim() === '' ? {type: null, payload: null} : addTodo(new Todo(value))));

    toggleAll$ =  new Rx.Subject()
        .map((payload) =>  toggleAll(payload));

    constructor(store: Store<AppState>) {
        Rx.Observable.merge(
            this.todo$,
            this.toggleAll$
        )
            .subscribe(store.dispatch.bind(store));
    }
}
