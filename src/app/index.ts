// App
export * from './app.component';
export * from './app.routes';

import {AuthService, TodoService} from './services';
import {LoggedInGuard, IsAdminGuard} from './guards';

// Application wide providers
export const APP_PROVIDERS = [
    AuthService,
    TodoService,

    LoggedInGuard,
    IsAdminGuard
];
