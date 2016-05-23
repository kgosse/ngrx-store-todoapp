/**
 * Created by kevin on 05/05/2016.
 */

import {Component, OnInit} from "angular2/core";
import {TodoService} from "../services/todo.service";
import * as Statuses from "../constants/Statuses";


@Component({
    selector: 'status-selector',
    template:`
        <select #sel (change)="statusChange(sel.value)">
            <option *ngFor="#status of statuses">
                {{status}}
            </option>
        </select>
    `
})
export class StatusSelector implements OnInit{
    statuses = [];
    
    constructor(private _todoService: TodoService) {}

    statusChange(val) {
        this._todoService.statusChange(val);
    }
    
    ngOnInit(){
        for (let status in Statuses)
            this.statuses.push(Statuses[status]);
        this.statusChange(this.statuses[0]);
    }
}
