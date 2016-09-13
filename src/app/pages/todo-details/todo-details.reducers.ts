import {Action} from '@ngrx/store';
import {TodoItem} from './../../services';
import {AppActions} from '../../app.actions';

export const todoDetailsReducers = {
    item
};

///

function item(state:TodoItem, action:Action) {
    switch (action.type) {
        case AppActions.ITEM_LOADED:
            return action.payload;
        default:
            return state;
    }
}