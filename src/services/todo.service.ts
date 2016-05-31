import {Injectable, EventEmitter} from "@angular/core";
import {Todo, TodoStore} from '../store';
import {Action} from "../interfaces/Action";
import {STATUS_CHANGE, ARCHIVE, TEXT_CHANGE} from "../constants/ActionTypes";



@Injectable()
export class TodoService {
    public todoEvent: EventEmitter<any>;
    private _todoStore: TodoStore;

    constructor() {
        this._todoStore = new TodoStore();
        this.todoEvent = new EventEmitter();
    }

    getTodos() {
        return Promise.resolve(this._todoStore.todos);
    }

    addTodo(todo: Todo) {
        this._todoStore.add(todo);
    }

    getTodosLength() {
        return this._todoStore.todos.length;
    }

    getRemainingTasksLength() {
        return this._todoStore.getRemaining().length;
    }

    archive() {
        this._todoStore.removeDoneTasks();
        this.todoEvent.emit({
            type: ARCHIVE
        });
    }

    toggleTodos() {
        this._todoStore.toggleAll();
    }

    removeTodo(todo: Todo) {
        this._todoStore.remove(todo);
    }

    saveTodos() {
        this._todoStore.updateStore();
    }

    statusChange(val) {
        this.todoEvent.emit({
            type: STATUS_CHANGE,
            payload: val 
        });
    }
    
    textChange(val: string) {
        this.todoEvent.emit({
            type: TEXT_CHANGE,
            payload: val.trim()
        })
    }
}