/**
 *  action types
 */


export const TEXT_UPDATE = '@@filters/TEXT_UPDATE';


/**
 *  action creators
 */

export function filterByText(payload) {
    return {
        type: TEXT_UPDATE,
        payload
    }
}

