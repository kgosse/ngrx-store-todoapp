import {ActionReducer} from "@ngrx/store/reducer";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, ARCHIVE, TOGGLE_EDITING, UPDATE_TEXT} from "../actions/todos";
import {Todo} from "../models/Todo.model";

const persistedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

const todosInitialState = persistedTodos.map( (todo: {_text: String, done: Boolean}) => {
    let ret = new Todo(todo._text);
    ret.done = todo.done;
    return ret;
});

export const todos:ActionReducer<Todo[]> = (state = todosInitialState, {type, payload}) => {
    switch (type){
        case ADD_TODO:
            return [payload, ...state];

        case REMOVE_TODO:
            return state.filter(t => t !== payload);

        case TOGGLE_TODO:
            return state.map(t => {
                if (t === payload)
                    t.done = !t.done;
                return t;
            });

        case TOGGLE_EDITING:
            return state.map(t => {
                if (t === payload.todo) {
                    t.editing = payload.editing;
                    t.text = payload.text && payload.text.trim() !== "" ? payload.text : t.text;
                }
                return t;
            });
        
        case UPDATE_TEXT:
            return state.map(t => {
                if (t === payload.todo) {
                    t.text = payload.text.trim() !== "" ?  payload.text.trim() : t.text;
                    t.editing = false;
                }
                return t;
            });


        case TOGGLE_ALL:
            return state.map(t => {
                t.done = payload;
                return t;
            });

        case ARCHIVE:
            return state.filter(t => t.done === false);

        default:
            return state;
    }
};
