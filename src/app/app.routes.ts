import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';
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
    path: 'client',
    component: MasterComponent,
    loadChildren: () =>
      import('./pages/client/client.routes').then((r) => r.routes),
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
    path: '',
    redirectTo: 'client',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'client' },
];
