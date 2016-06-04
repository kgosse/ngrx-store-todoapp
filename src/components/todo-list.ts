import {Component, OnInit} from "@angular/core";
import {Todo} from "../store/index";
import {TodoService} from "../services/todo.service";
import {StatusPipe} from "../pipes/status.pipe";
import {TextPipe} from "../pipes/text.pipe";
import {AppState} from "../interfaces/AppState";
import {Store} from "@ngrx/store";
import * as Rx from "rxjs/Rx";
import {removeTodo, toggleTodo} from "../actions/todos";

@Component({
    selector:'todo-list',
    pipes:<any[]>[StatusPipe, TextPipe],
    template:`
            <ul id="todo-list">
              <li *ngFor="let todo of (todos | async) | status: _status | text: (filters | async).text" [class.completed]="todo.done" [class.editing]="todo.editing">
                <div class="view">
                  <input type="checkbox" class="toggle" [checked]="todo.done" (click)="toggleTodo$.next(todo)">
                  <label (dblclick)="editTodo(todo)">{{todo.text}}</label>
                  <button class="destroy" (click)="removeClick$.next(todo)"></button>
                </div>
                <input class="edit" *ngIf="todo.editing" [value]="todo.text" #editedtodo (blur)="stopEditing(todo, editedtodo.value)" (keyup.enter)="updateEditingTodo(todo, editedtodo.value)" (keyup.escape)="cancelEditingTodo(todo)">
              </li>
            </ul>
            `
})
export class TodoList implements OnInit{
    todos;
    filters;
    _status: "";
    _text: "";

    removeClick$ = new Rx.Subject()
        .map((payload) =>  removeTodo(payload));

    toggleTodo$ =  new Rx.Subject()
        .map((payload) =>  toggleTodo(payload));

    constructor(private _todoService: TodoService, store: Store<AppState>){
        this.todos = store.select('todos');
        this.filters = store.select('filters');

        Rx.Observable.merge(
            this.removeClick$,
            this.toggleTodo$
        )
            .subscribe(store.dispatch.bind(store));
    }


    stopEditing(todo: Todo, editedTitle: string) {
        todo.text = editedTitle;
        todo.editing = false;
    }

    cancelEditingTodo(todo: Todo) {
        todo.editing = false;
    }

    updateEditingTodo(todo: Todo, editedTitle: string) {
        editedTitle = editedTitle.trim();
        todo.editing = false;

        if (editedTitle.length === 0) {
            return this.removeTodo(todo);
        }

        todo.text = editedTitle;
        this._todoService.saveTodos();
    }

    editTodo(todo:Todo) {
        todo.editing = true;
    }

    getTodos() {
        this._todoService.getTodos().then(todos => this.todos = todos);
    }

    toggleCheck(todo) {
        todo.done = !todo.done;
        this._todoService.saveTodos();
    }

    removeTodo(todo:Todo) {
        this._todoService.removeTodo(todo);
    }

    ngOnInit() {
        // this.getTodos();
    }
}