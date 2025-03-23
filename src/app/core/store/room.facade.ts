import { inject, Injectable } from "@angular/core";
import { Action, select, Store } from "@ngrx/store";
import { RoomState } from "./room.reducer";
import * as RoomSelectors from './room.selectors';
import { RoomActions } from './room.actions';
import { Actions, ofType } from "@ngrx/effects";
import { Entity } from "@app/models/entity.interface";
import { Room, NewRoom, ChangedRoom } from "@app/models/room.interface";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RoomFacade {
  private readonly store: Store<RoomState> = inject(Store);
  private readonly actions: Actions = inject(Actions);

  rooms$ = this.store.select(RoomSelectors.selectRooms);
  roomsLoadError$ = this.store.select(RoomSelectors.selectRoomsLoadError);
  roomsLoadRun$ = this.store.select(RoomSelectors.selectRoomsLoadRun);

  roomAdded$: Observable<Room> = this.actions.pipe(
    ofType(RoomActions.addRoomSuccess),
    map((action) => action.payload)
  );

  roomChanged$ = this.actions.pipe(
    ofType(RoomActions.changeRoomSuccess),
    map((action) => action.payload)
  );

  room$ = (id: number): Observable<Room | null> =>
    this.store.select(RoomSelectors.selectRoom({ id }));

  roomsByBuilding$ = (id: number): Observable<Room[]> =>
    this.store.select(RoomSelectors.selectRoomsByBuilding({ id }));

  clear(): void {
    this.dispatch(RoomActions.clearRooms());
  }

  load(): void {
    this.dispatch(RoomActions.loadRooms());
  }

  removeRoom(payload: Entity): void {
    this.dispatch(RoomActions.removeRoom({ payload }));
  }

  removeRooms(payload: number[]): void {
    this.dispatch(RoomActions.removeRooms({ payload }));
  }

  addRoom(payload: NewRoom): void {
    this.dispatch(RoomActions.addRoom({ payload }));
  }

  changeRoom(payload: ChangedRoom): void {
    this.dispatch(RoomActions.changeRoom({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}