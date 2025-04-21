import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'booking',
    loadComponent: () =>
      import('./booking/booking.component').then((c) => c.BookingComponent),
  },
  {
    path: 'rooms/:id',
    loadComponent: () =>
      import('./rooms/room.component').then((c) => c.RoomComponent),
    data: {
      title: 'Example Page',
      requiresLogin: true,
    },

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
