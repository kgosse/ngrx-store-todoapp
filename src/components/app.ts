import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as Rx from "rxjs/Rx";

import {TodoService} from "../services/todo.service";
import {TodoList} from "./todo-list";
import {Todo} from "../store/index";
import {Menubar} from "./menubar";
import {AppState} from "../interfaces/AppState";
import {addTodo} from "../actions/todos";


@Component({
    selector: 'app',
    providers: [
        TodoService
    ],
    directives: <any[]>[
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
            <input type="checkbox" id="toggle-all" (click)="toggleTodos()">
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

    constructor(store: Store<AppState>) {
        Rx.Observable.merge(
            this.todo$
        )
            .subscribe(store.dispatch.bind(store));
    }
}
