import { RoomExtended } from "./room-manager.service";


export const ROOM_EXTENDED_STUB: RoomExtended = {
  ...ROOM_STUB,
  buildingExtended: { ...BUILDING_STUB, personExtended: PERSON_STUB },
};

export const ROOMS_EXTENDED_STUB: RoomExtended[] = [ROOM_EXTENDED_STUB];
