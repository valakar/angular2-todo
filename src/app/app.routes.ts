import {Routes, RouterModule} from '@angular/router';
import {Home} from './home';


export const ROUTES:Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home
  }
];
