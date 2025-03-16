import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';

export const routes: Routes = [
  {
    path: 'client',
    component: MasterComponent,
    loadChildren: () =>
      import('./pages/client/client.routes').then((r) => r.routes),
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'client' },
];
