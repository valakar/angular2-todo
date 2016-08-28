import {WebpackAsyncRoute} from '@angularclass/webpack-toolkit';
import {RouterConfig} from '@angular/router';
import {TodoList} from './todo-list';
import {TodoDetails} from './todo-details';

export const routes:RouterConfig = [
    {
        path: '',
        component: TodoList
    },
    {
        path: 'details',
        component: TodoDetails
    }
];

export const asyncRoutes:AsyncRoutes = {
};


export const prefetchRouteCallbacks:Array<IdleCallbacks> = [
];

// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
