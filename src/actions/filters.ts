/**
 *  action types
 */


export const TEXT_UPDATE = '@@filters/TEXT_UPDATE';
export const STATUS_UPDATE = '@@filters/STATUS_UPDATE';



/**
 *  action creators
 */

export function filterByText(payload) {
    return {
        type: TEXT_UPDATE,
        payload
    }
}

export function filterByStatus(payload) {
    return {
        type: STATUS_UPDATE,
        payload
    }
}

/*
 *  constants
 */

export const ALL = "All";
export const IN_PROGRESS = "In Progress";
export const DONE = "Done";

