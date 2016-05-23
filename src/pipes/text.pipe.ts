import {PipeTransform, Pipe} from "angular2/core";

@Pipe({name: 'text'})
export class TextPipe implements PipeTransform{

    transform(values:any, [text]):any {
        if (!text || text === "")
            return values;
        return values.filter((todo) => todo.text.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }

}