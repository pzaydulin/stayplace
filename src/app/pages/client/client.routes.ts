import { Routes } from '@angular/router';
import { bookingFeature } from '@app/store/booking.reducer';
import { BuildingEffects } from '@app/store/building.effects';
import { buildingFeature } from '@app/store/building.reducer';
import { PersonEffects } from '@app/store/person.effects';
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
      provideEffects(BuildingEffects),
      provideEffects(PersonEffects),
      provideState(bookingFeature),
    ],
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
