import {Component} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {TodoList} from "./todo-list";
import {Todo} from "../store/index";
import {Menubar} from "./menubar";

import {Store} from '@ngrx/store';
import {AppState} from "../interfaces/AppState";


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
            <input type="text" id="new-todo" placeholder="What needs to be done?" [(ngModel)]="todo.text" (keyup.enter)="addTodo()">
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
    todo:Todo = new Todo('');

    constructor(private _todoService: TodoService, store: Store<AppState>) {}

    addTodo() {
        if (this.todo.text.trim() === '')
            return;
        this._todoService.addTodo(this.todo);
        this.todo = new Todo('');
    }

    toggleTodos() {
        this._todoService.toggleTodos();
    }
}
