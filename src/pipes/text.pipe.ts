import {PipeTransform, Pipe} from "@angular/core";

@Pipe({name: 'text'})
export class TextPipe implements PipeTransform{

    transform(values:any, text: string):any {
        if (!text || text === "")
            return values;
        return values.filter((todo) => todo.text.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }

}