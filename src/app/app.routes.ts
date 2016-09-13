import {WebpackAsyncRoute} from '@angularclass/webpack-toolkit';
import {RouterConfig} from '@angular/router';
import {LoggedInGuard, IsAdminGuard} from './guards';

export const routes:RouterConfig = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: 'TodoList',
        canActivate: [LoggedInGuard]
    },
    {
        path: 'details/:id',
        component: 'TodoDetails',
        canActivate: [LoggedInGuard, IsAdminGuard]
    },
    {
        path: 'login',
        component: 'LoginComponent'
    }
];

export const asyncRoutes:AsyncRoutes = {
    'TodoList': require('es6-promise-loader!./pages/todo-list'),
    'TodoDetails': require('es6-promise-loader!./pages/todo-details'),
    'LoginComponent': require('es6-promise-loader!./pages/login')
};


export const prefetchRouteCallbacks:Array<IdleCallbacks> = [
    //asyncRoutes['TodoList']
];

/// No Lazy Load - one bundle for all pages
/*
 import {TodoList} from './pages/todo-list';
 import {TodoDetails} from './pages/todo-details';

 export const routes:RouterConfig = [
     {
         path: '',
         component: TodoList
     },
     {
         path: 'details/:id',
         component: TodoDetails
     }
 ];
 */
