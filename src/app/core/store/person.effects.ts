import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { PersonActions } from './person.actions';
import * as PersonSelectors from './person.selectors';
import { PersonStorage } from '@app/storage/person.storage';
import { of } from 'rxjs';
import { createPersonFromNewPerson } from '../utils/person.util';

@Injectable({
  providedIn: 'root',
})
export class PersonEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly storage$ = inject(PersonStorage);
  private readonly store$ = inject(Store);

  loadPersons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonActions.loadPersons),
      concatMap(() =>
        this.storage$.get().pipe(
          map((payload) => PersonActions.loadPersonsSuccess({ payload })),
          catchError((payload) =>
            of(PersonActions.loadPersonsFailure({ payload }))
          )
        )
      )
    );
  });

  addPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonActions.addPerson),
      withLatestFrom(this.store$.select(PersonSelectors.selectPersons)),
      mergeMap(([action, persons]) => {
        try {
          const updatedPerson = createPersonFromNewPerson(
            persons ?? [],
            action.payload
          );
          return of(PersonActions.addPersonSuccess({ payload: updatedPerson }));
        } catch (error) {
          return of(
            PersonActions.addPersonFailure({
              payload: error || 'Error adding person',
            })
          );
        }
      })
    );
  });

  removePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.removePerson),
      withLatestFrom(this.store$.select(PersonSelectors.selectPersonsEntities)),
      mergeMap(([action, personsEntities]) => {
        const person = personsEntities
          ? personsEntities[action.payload.id]
          : null;

        return person
          ? of(PersonActions.removePersonSuccess({ payload: action.payload }))
          : of(PersonActions.removePersonCancel());
      }),
      catchError((error) =>
        of(
          PersonActions.removePersonFailure({
            payload: error || 'Error removing person',
          })
        )
      )
    )
  );

  changePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.changePerson),
      mergeMap((action) =>
        of(PersonActions.changePersonSuccess({ payload: action.payload })).pipe(
          catchError((error) =>
            of(PersonActions.changePersonFailure({ payload: error }))
          )
        )
      )
    )
  );

  removePersonBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.removePersonBuilding),
      withLatestFrom(this.store$.select(PersonSelectors.selectPersonsEntities)),
      mergeMap(([action, personsEntities]) => {
        const person = personsEntities
          ? personsEntities[action.payload.id]
          : null;
        const buildings =
          person?.buildings.filter(
            (building) => building !== action.payload.building
          ) ?? [];

        return of(
          PersonActions.removePersonBuildingSuccess({
            payload: { id: action.payload.id, buildings },
          })
        );
      }),
      catchError((error) =>
        of(
          PersonActions.removePersonBuildingFailure({
            payload: error || 'Error removing person building',
          })
        )
      )
    )
  );

  addPersonBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.addPersonBuilding),
      withLatestFrom(this.store$.select(PersonSelectors.selectPersonsEntities)),
      mergeMap(([action, personsEntities]) => {
        const person = personsEntities
          ? personsEntities[action.payload.id]
          : null;
        const buildings = person?.buildings ?? [];

        return of(
          PersonActions.addPersonBuildingSuccess({
            payload: {
              id: action.payload.id,
              buildings: [...buildings, action.payload.building],
            },
          })
        );
      }),
      catchError((error) =>
        of(
          PersonActions.addPersonBuildingFailure({
            payload: error || 'Error adding person building',
          })
        )
      )
    )
  );

  clearPersonsBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.clearPersonsBuildings),
      withLatestFrom(this.store$.select(PersonSelectors.selectPersons)),
      mergeMap(([action, persons]) => {
        return of(
          PersonActions.clearPersonsBuildingsSuccess({
            payload:
              persons?.map((person) => ({ ...person, buildings: [] })) ?? [],
          })
        );
      }),
      catchError((error) =>
        of(
          PersonActions.clearPersonsBuildingsFailure({
            payload: error || 'Error clearing person buildings',
          })
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return PersonActions.loadPersons();
  }
}
