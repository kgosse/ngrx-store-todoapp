/**
 * Created by kevin on 05/05/2016.
 */

import {Component} from "@angular/core";
import {ALL, IN_PROGRESS, DONE, filterByStatus} from "../actions/filters";
import {AppState} from "../interfaces/AppState";
import {Store} from "@ngrx/store";
import * as Rx from "rxjs/Rx";

@Component({
    selector: 'status-selector',
    template:`
        <select #sel (change)="changeStatus$.next(sel.value)">
            <option *ngFor="let status of statuses">
                {{status}}
            </option>
        </select>
    `
})
export class StatusSelector {
    statuses = [ALL, IN_PROGRESS, DONE];

    changeStatus$ = new Rx.Subject()
        .map((status) => filterByStatus(status));

    constructor(store: Store<AppState>) {
        Rx.Observable.merge(
            this.changeStatus$
        )
            .subscribe(store.dispatch.bind(store));
    }
}
