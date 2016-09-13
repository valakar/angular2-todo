// App
export * from './app.component';
export * from './app.routes';

import {AppActions} from './app.actions';
import {AuthService, TodoService} from './services';
import {LoggedInGuard, IsAdminGuard} from './guards';

// Application wide providers
export const APP_PROVIDERS = [
    AppActions,
    AuthService,
    TodoService,

    LoggedInGuard,
    IsAdminGuard
];
