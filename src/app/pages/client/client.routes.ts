import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'booking',
    loadComponent: () =>
      import('./booking/booking.component').then((c) => c.BookingComponent),
  },
  {
    path: 'room/:id',
    loadComponent: () =>
      import('./rooms/room.component').then((c) => c.RoomComponent),
  },
  {
    path: 'test-map',
    loadComponent: () =>
      import('./../test-map/test-map/test-map.component').then(
        (c) => c.MapComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'booking',
  },
];
