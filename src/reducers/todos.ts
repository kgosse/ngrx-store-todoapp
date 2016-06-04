import {ActionReducer} from "@ngrx/store/reducer";
import {ADD_TODO} from "../actions/todos";
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

        default:
            return state;
    }
};
