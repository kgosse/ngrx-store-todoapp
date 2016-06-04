import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import {AppState} from "../interfaces/AppState";
import {ADD_TODO} from "../actions/todos";


@Injectable()
export class TodoEffects {
    constructor(private updates$:StateUpdates<AppState>) {}

    @Effect() storeTodos$ = this.updates$
        .whenAction(ADD_TODO)
        .map((data) => {
            localStorage.setItem('todos', JSON.stringify(data.state.todos));
            return data;
        });
}