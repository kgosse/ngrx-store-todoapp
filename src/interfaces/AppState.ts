import {Todo} from './Todo';
import {Filters} from "./Filters";

export interface AppState {
    todos: Todo[];
    filters: Filters;
}