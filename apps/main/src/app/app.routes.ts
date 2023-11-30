import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {path: '', redirectTo: 'countries', pathMatch: 'full'},
  {path: 'countries', loadComponent: () => import('./components/countries/countries.component')},
];

