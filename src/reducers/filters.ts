import {ActionReducer} from "@ngrx/store/reducer";
import {Filters} from "../interfaces/Filters";
import {TEXT_UPDATE, ALL, STATUS_UPDATE} from "../actions/filters";

const initialState: Filters = {
    text: '',
    status: ALL
};

export const filters:ActionReducer<Filters> = (state = initialState,  {type, payload}) => {
    switch (type){
        
        case TEXT_UPDATE:
            return Object.assign({}, state, {text: payload});

        case STATUS_UPDATE:
            return Object.assign({}, state, {status: payload});
        
        default:
            return state;
    }
};
