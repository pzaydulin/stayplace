import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoomActions } from './room.actions';
import { RoomStorage } from '@app/storage/room.storage';
import { Action, Store } from '@ngrx/store';
import * as RoomSelectors from './room.selectors';
import { createRoomFromNewRoom } from '../utils/room.util';

@Injectable({
  providedIn: 'root',
})
export class RoomEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly storage$ = inject(RoomStorage);
  private readonly store$ = inject(Store);

  loadRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomActions.loadRooms),
      concatMap(() =>
        this.storage$.get().pipe(
          map((payload) => RoomActions.loadRoomsSuccess({ payload })),
          catchError((payload) => of(RoomActions.loadRoomsFailure({ payload })))
        )
      )
    );
  });

  addRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomActions.addRoom),
      withLatestFrom(this.store$.select(RoomSelectors.selectRooms)),
      mergeMap(([action, rooms]) => {
        try {
          const updatedRooms = createRoomFromNewRoom(
            rooms ?? [],
            action.payload
          );
          return of(RoomActions.addRoomSuccess({ payload: updatedRooms }));
        } catch (error) {
          return of(
            RoomActions.addRoomFailure({
              payload: error || 'Error adding room',
            })
          );
        }
      })
    );
  });

  removeRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.removeRoom),
      withLatestFrom(this.store$.select(RoomSelectors.selectRoomsEntities)),
      mergeMap(([action, roomsEntities]) => {
        const room = roomsEntities ? roomsEntities[action.payload.id] : null;

        return room
          ? of(RoomActions.removeRoomSuccess({ payload: action.payload }))
          : of(RoomActions.removeRoomCancel());
      }),
      catchError((error) =>
        of(
          RoomActions.removeRoomFailure({
            payload: error || 'Error removing room',
          })
        )
      )
    )
  );

  changeRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.changeRoom),
      mergeMap((action) =>
        of(RoomActions.changeRoomSuccess({ payload: action.payload })).pipe(
          catchError((error) =>
            of(RoomActions.changeRoomFailure({ payload: error }))
          )
        )
      )
    )
  );

  removeRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.removeRooms),
      mergeMap((action) =>
        of(RoomActions.removeRoomsSuccess({ payload: action.payload })).pipe(
          catchError((error) =>
            of(
              RoomActions.removeRoomsFailure({
                payload: { ...error, rooms: action.payload },
              })
            )
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return RoomActions.loadRooms();
  }
}
