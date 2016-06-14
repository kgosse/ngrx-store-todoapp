/**
 *  action types
 */


export const REMOVE_TODO = '@@todos/REMOVE_TODO';
export const TOGGLE_TODO = '@@todos/TOGGLE_TODO';
export const ADD_TODO = '@@todos/ADD_TODO';
export const TOGGLE_ALL = '@@todos/TOGGLE_ALL';
export const ARCHIVE = '@@todos/ARCHIVE';
export const TOGGLE_EDITING = '@@todos/TOGGLE_EDITING';
export const UPDATE_TEXT = '@@todos/UPDATE_TEXT';



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

export function toggleEditTodo(payload) {
    return {
        type: TOGGLE_EDITING,
        payload
    }
}

export function updateTodoText(payload) {
    return {
        type: UPDATE_TEXT,
        payload
    }
}


