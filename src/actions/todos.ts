/**
 *  action types
 */


export const REMOVE_TODO = '@@todos/REMOVE_TODO';
export const TOGGLE_TODO = '@@todos/TOGGLE_TODO';
export const ADD_TODO = '@@todos/ADD_TODO';
export const TOGGLE_ALL = '@@todos/TOGGLE_ALL';
export const ARCHIVE = '@@todos/ARCHIVE';
export const FILTER_REMAINING = '@@todos/FILTER_REMAINING';
export const REMOVE_DONE_TASKS = '@@todos/REMOVE_DONE_TASKS';
export const UPDATE_STORE = '@@todos/UPDATE_STORE';


/**
 *  action creators
 */

export function addTodo(payload) {
    return {
        type: ADD_TODO,
        payload
    }
}

export function removeTodo(payload) {
    return {
        type: REMOVE_TODO,
        payload
    }
}

export function toggleTodo(payload) {
    return {
        type: TOGGLE_TODO,
        payload
    }
}

export function toggleAll(payload) {
    return {
        type: TOGGLE_ALL,
        payload
    }
}

export function archive() {
    return {
        type: ARCHIVE,
        payload: null
    }
}


