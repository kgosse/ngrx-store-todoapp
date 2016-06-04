import {Component} from "@angular/core";
import {StatusPipe} from "../pipes/status.pipe";
import {TextPipe} from "../pipes/text.pipe";
import {AppState} from "../interfaces/AppState";
import {Store} from "@ngrx/store";
import * as Rx from "rxjs/Rx";
import {removeTodo, toggleTodo, toggleEditTodo, updateTodoText} from "../actions/todos";

@Component({
    selector:'todo-list',
    pipes:<any[]>[StatusPipe, TextPipe],
    template:`
            <ul id="todo-list">
              <li *ngFor="let todo of (todos | async) | status: (filters | async).status | text: (filters | async).text" [class.completed]="todo.done" [class.editing]="todo.editing">
                <div class="view">
                  <input type="checkbox" class="toggle" [checked]="todo.done" (click)="toggleTodo$.next(todo)">
                  <label (dblclick)="toggleEditTodo$.next({todo: todo, editing: true, text: null})">{{todo.text}}</label>
                  <button class="destroy" (click)="removeClick$.next(todo)"></button>
                </div>
                <input class="edit" *ngIf="todo.editing" [value]="todo.text" #editedtodo (blur)="toggleEditTodo$.next({todo: todo, editing: false, text: editedtodo.value})" (keyup.enter)="updateTodoText$.next({todo: todo, text: editedtodo.value})" (keyup.escape)="toggleEditTodo$.next({todo: todo, editing: false, text: null})">
              </li>
            </ul>
            `
})
export class TodoList {
    todos;
    filters;

    removeClick$ = new Rx.Subject()
        .map((payload) =>  removeTodo(payload));

    toggleTodo$ =  new Rx.Subject()
        .map((payload) =>  toggleTodo(payload));
    
    toggleEditTodo$ = new Rx.Subject()
        .map((payload) => toggleEditTodo(payload));
    
    updateTodoText$ = new Rx.Subject()
        .map((payload) => updateTodoText(payload));

    constructor(store: Store<AppState>){
        this.todos = store.select('todos');
        this.filters = store.select('filters');

        Rx.Observable.merge(
            this.removeClick$,
            this.toggleTodo$,
            this.toggleEditTodo$,
            this.updateTodoText$
        )
            .subscribe(store.dispatch.bind(store));
    }
}