import {PipeTransform, Pipe} from "angular2/core";
import { IN_PROGRESS, DONE } from "../constants/Statuses";

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform{

    transform(values:any, [status]):any {
        if (status === IN_PROGRESS)
            return values.filter((todo) => !todo.done);
        else if (status === DONE)
            return values.filter((todo) => todo.done);
        return values;
    }

}