import { Entity } from '@app/models/entity.interface';
import { ChangedRoom, NewRoom, Room, RoomEntity } from '@app/models/room.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RoomActions = createActionGroup({
  source: 'Room',
  events: {
    'Load Rooms': emptyProps(),
    'Load Rooms Cancel': emptyProps(),
    'Load Rooms Success': props<{ payload: Room[] }>(),
    'Load Rooms Failure': props<{ payload: Record<string, any> }>(),
    'Clear Rooms': emptyProps(),
    'Remove Room': props<{ payload: Entity }>(),
    'Remove Room Cancel': emptyProps(),
    'Remove Room Success': props<{ payload: Entity }>(),
    'Remove Room Failure': props<{ payload: Record<string, any> & Entity }>(),
    'Remove Rooms': props<{ payload: number[] }>(),
    'Remove Rooms Cancel': emptyProps(),
    'Remove Rooms Success': props<{ payload: number[] }>(),
    'Remove Rooms Failure': props<{
      payload: Record<string, any> & { rooms: number[] };
    }>(),
    'Add Room': props<{ payload: NewRoom }>(),
    'Add Room Cancel': emptyProps(),
    'Add Room Success': props<{ payload: RoomEntity }>(),
    'Add Room Failure': props<{ payload: Record<string, any> }>(),
    'Change Room': props<{ payload: ChangedRoom }>(),
    'Change Room Cancel': emptyProps(),
    'Change Room Success': props<{ payload: ChangedRoom }>(),
    'Change Room Failure': props<{ payload: Record<string, any> & Entity }>(),
  },
});
