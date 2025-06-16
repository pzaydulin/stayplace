import { RoomExtended } from "./room-manager.service";
import { ROOM_STUB } from "@app/data/unit-test/room.stub";
import { BUILDING_STUB } from "@app/data/unit-test/building.stub";
import { PERSON_STUB } from "@app/data/unit-test/person.stub";


export const ROOM_EXTENDED_STUB: RoomExtended = {
  ...ROOM_STUB,
  buildingExtended: { ...BUILDING_STUB, personExtended: PERSON_STUB },
};

export const ROOMS_EXTENDED_STUB: RoomExtended[] = [ROOM_EXTENDED_STUB];
