import {PipeTransform, Pipe} from "@angular/core";
import { IN_PROGRESS, DONE } from "../constants/Statuses";

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform{

    transform(values:any, status: string):any {
        if (status === IN_PROGRESS)
            return values.filter((todo) => !todo.done);
        else if (status === DONE)
            return values.filter((todo) => todo.done);
        return values;
    }

}