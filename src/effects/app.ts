import {Injectable} from "@angular/core";
import {Effect, StateUpdates} from "@ngrx/effects";
import {AppState} from "../interfaces/AppState";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, ARCHIVE, UPDATE_TEXT} from "../actions/todos";


@Injectable()
export class AppEffects {
    constructor(private updates$:StateUpdates<AppState>) {}

    @Effect() storeTodos$ = this.updates$
        .whenAction(ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, ARCHIVE, UPDATE_TEXT)
        .map((data) => {
            localStorage.setItem('todos', JSON.stringify(data.state.todos));
            return data;
        });
}