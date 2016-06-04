import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import {AppState} from "../interfaces/AppState";


@Injectable()
export class TodoEffects {
    constructor(private updates$:StateUpdates<AppState>) {}
}