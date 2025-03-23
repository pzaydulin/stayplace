import { Routes } from '@angular/router';
import { buildingFeature } from '@app/store/building.reducer';
import { personFeature } from '@app/store/person.reducer';
import { RoomEffects } from '@app/store/room.effects';
import { roomFeature } from '@app/store/room.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideState,  } from '@ngrx/store';

export const routes: Routes = [
  {
    path: 'booking',
    loadComponent: () =>
      import('./booking/booking.component').then((c) => c.BookingComponent),
    providers: [
      provideState(roomFeature),
      provideState(buildingFeature),
      provideState(personFeature),
      provideEffects(RoomEffects),
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'booking',
  },
];
