import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { BuildingActions } from './building.actions';
import { Store, Action } from '@ngrx/store';
import { BuildingStorage } from '@app/storage/building.storage';
import { of } from 'rxjs';
import * as BuildingSelectors from './building.selectors';
import { createBuildingFromNewBuilding } from '../utils/building.util';

@Injectable({
  providedIn: 'root',
})
export class BuildingEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly storage$ = inject(BuildingStorage);
  private readonly store$ = inject(Store);

  loadBuildings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuildingActions.loadBuildings),
      concatMap(() =>
        this.storage$.get().pipe(
          map((payload) => BuildingActions.loadBuildingsSuccess({ payload })),
          catchError((payload) =>
            of(BuildingActions.loadBuildingsFailure({ payload }))
          )
        )
      )
    );
  });

  clearBuildingsRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.clearBuildingsRooms),
      withLatestFrom(this.store$.select(BuildingSelectors.selectBuildings)),
      mergeMap(([action, buildings]) => {
        return of(
          BuildingActions.clearBuildingsRoomsSuccess({
            payload:
              buildings?.map((building) => ({ ...building, rooms: [] })) ?? [],
          })
        );
      }),
      catchError((error) =>
        of(
          BuildingActions.clearBuildingsRoomsFailure({
            payload: error || 'Error clearing rooms',
          })
        )
      )
    )
  );

  removeBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.removeBuilding),
      withLatestFrom(
        this.store$.select(BuildingSelectors.selectBuildingsEntities)
      ),
      mergeMap(([action, buildingsEntities]) => {
        const building = buildingsEntities
          ? buildingsEntities[action.payload.id]
          : null;

        return building
          ? of(
              BuildingActions.removeBuildingSuccess({ payload: action.payload })
            )
          : of(BuildingActions.removeBuildingCancel());
      }),
      catchError((error) =>
        of(
          BuildingActions.removeBuildingFailure({
            payload: error || 'Error removing building',
          })
        )
      )
    )
  );

  addBuilding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuildingActions.addBuilding),
      withLatestFrom(this.store$.select(BuildingSelectors.selectBuildings)),
      mergeMap(([action, buildings]) => {
        try {
          const updatedBuilding = createBuildingFromNewBuilding(
            buildings ?? [],
            action.payload
          );
          return of(
            BuildingActions.addBuildingSuccess({ payload: updatedBuilding })
          );
        } catch (error) {
          return of(
            BuildingActions.addBuildingFailure({
              payload: error || 'Error adding building',
            })
          );
        }
      })
    );
  });

  changeBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.changeBuilding),
      mergeMap((action) =>
        of(
          BuildingActions.changeBuildingSuccess({ payload: action.payload })
        ).pipe(
          catchError((error) =>
            of(BuildingActions.changeBuildingFailure({ payload: error }))
          )
        )
      )
    )
  );

  addBuildingRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.addBuildingRoom),
      withLatestFrom(
        this.store$.select(BuildingSelectors.selectBuildingsEntities)
      ),
      mergeMap(([action, buildingsEntities]) => {
        const building = buildingsEntities
          ? buildingsEntities[action.payload.id]
          : null;

        const rooms = building?.rooms ?? [];

        return of(
          BuildingActions.addBuildingRoomSuccess({
            payload: {
              id: action.payload.id,
              rooms: [...rooms, action.payload.room],
            },
          })
        );
      }),
      catchError((error) =>
        of(
          BuildingActions.addBuildingRoomFailure({
            payload: error || 'Error adding room',
          })
        )
      )
    )
  );

  removeBuildingRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.removeBuildingRoom),
      withLatestFrom(
        this.store$.select(BuildingSelectors.selectBuildingsEntities)
      ),
      mergeMap(([action, buildingsEntities]) => {
        const building = buildingsEntities
          ? buildingsEntities[action.payload.id]
          : null;

        const rooms =
          building?.rooms.filter((room) => room !== action.payload.room) ?? [];

        return of(
          BuildingActions.removeBuildingRoomSuccess({
            payload: {
              id: action.payload.id,
              rooms,
            },
          })
        );
      }),
      catchError((error) =>
        of(
          BuildingActions.addBuildingRoomFailure({
            payload: error || 'Error adding room',
          })
        )
      )
    )
  );

  removeBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingActions.removeBuildings),
      mergeMap((action) =>
        of(BuildingActions.removeBuildingsSuccess({ payload: action.payload })
        ).pipe(
          catchError((error) =>
            of(BuildingActions.removeBuildingsFailure({ payload: error }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return BuildingActions.loadBuildings();
  }
}
