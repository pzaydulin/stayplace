import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoom from './room.reducer';
import { Entity } from '@app/models/entity.interface';
import { RoomEntity } from '@app/models/room.interface';
import { Dictionary } from '@ngrx/entity';

export const selectRoomState = createFeatureSelector<fromRoom.RoomState>(
  fromRoom.ROOM_FEATURE_KEY
);

const { selectAll, selectEntities } = fromRoom.roomAdapter.getSelectors();

export const selectRooms = createSelector(selectRoomState, (state) =>
  selectAll(state)
);

export const selectRoomsEntities = createSelector(selectRoomState, (state) =>
  selectEntities(state)
);

export const selectRoomsLoadError = createSelector(
  selectRoomState,
  (state) => state.roomsLoadError
);

export const selectRoomsLoadRun = createSelector(
  selectRoomState,
  (state) => state.roomsLoadRun
);

export const selectRoomCreateError = createSelector(
  selectRoomState,
  (state) => state.roomCreateError
);

export const selectRoomCreateRun = createSelector(
  selectRoomState,
  (state) => state.roomCreateRun
);

export const selectRoom = (props: Entity) =>
  createSelector(
    selectRoomsEntities,
    (dictionary: Dictionary<RoomEntity>) => dictionary[props.id] ?? null
  );

export const selectRoomsByBuilding = (props: Entity) =>
  createSelector(
    selectRooms,
    (rooms: RoomEntity[]) =>
      rooms?.filter((room) => room.building === props.id) ?? []
  );
