export class Todo {
    done: Boolean;
    editing: Boolean;

    private _text: String;
    get text() {
        return this._text;
    }
    set text(value: String) {
        this._text = value.trim();
    }

    constructor(text: String) {
        this.done = false;
        this.editing = false;
        this.text = text.trim();
    }
}
