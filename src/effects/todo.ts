import {Injectable} from "@angular/core";
import {Effect, StateUpdates} from "@ngrx/effects";
import {AppState} from "../interfaces/AppState";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, ARCHIVE} from "../actions/todos";


@Injectable()
export class TodoEffects {
    constructor(private updates$:StateUpdates<AppState>) {}

    @Effect() storeTodos$ = this.updates$
        .whenAction(ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, ARCHIVE)
        .map((data) => {
            localStorage.setItem('todos', JSON.stringify(data.state.todos));
            return data;
        });

/*    @Effect() showState$ = this.updates$
        .whenAction(TOGGLE_ALL)
        .map((data) => {
            console.log(data);
            return data;
        });*/
}