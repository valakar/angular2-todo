import {Action} from '@ngrx/store';
import {FilterEnum} from './filterEnum';
import {TodoItem} from './../../services';
import {AppActions} from '../../app.actions';

export const todoListReducers = {
    items,
    filter,
    time
};

///

function items(state:TodoItem[] = [], action:Action) {
    switch (action.type) {
        case AppActions.ITEMS_LOADED:
            return action.payload;

        case AppActions.ADD_ITEM:
            return [
                ...state,
                action.payload
            ];

        case AppActions.UPDATE_ITEM:
            return state.map(i => {
                if (i.id === action.payload.id) {
                    return Object.assign({}, i, action.payload);
                }
                return i;
            });

        case AppActions.DELETE_ITEM:
            return state.filter(i => i.id !== action.payload.id);

        default:
            return state;
    }
}

function filter(state:FilterEnum = FilterEnum.All, action:Action) {
    switch (action.type) {
        case AppActions.SET_FILTER:
            return action.payload;
        default:
            return state;
    }
}

function time(state:Date = new Date(), action:Action) {
    switch (action.type) {
        case AppActions.SET_TIME:
            return action.payload;
        default:
            return state;
    }
}
