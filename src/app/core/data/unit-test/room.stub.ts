import { Entity } from '@app/models/entity.interface';
import { ChangedRoom, NewRoom, Room, RoomAmenities, RoomDto, RoomField } from '@app/models/room.interface';

export const ROOM_DTO_STUB: RoomDto = {
  id: 1,
  building: 1,
  guests: 2,
  beds: 1,
  bedrooms: 1,
  bathrooms: 1,
  price: 250,
  amenities: [
    RoomAmenities.AirConditioning,
    RoomAmenities.Elevator,
    RoomAmenities.CarbonMonoxideAlarm,
    RoomAmenities.Hangers,
    RoomAmenities.Tv,
  ],
  description: `
    <p>We are partnering with the owners to offer you this breathtaking waterfront property, located in one of the most highly-coveted neighborhoods on the Hood Canal. For a short time only. You don’t want to miss it!</p>
    <h3>The space</h3>
    <p>In this listing you are booking the main house only. Please keep in mind that the driveway, hot tub and the beach access are shared with guests from the guest cottage listing.</p>
    <h3>Guest access</h3>
    <p>The main house</p>
    `,
  photos: [
    '/images/rooms/apartments-1/p1.jpg',
    '/images/rooms/apartments-1/p2.jpg',
    '/images/rooms/apartments-1/p3.jpg',
    '/images/rooms/apartments-1/p4.jpg',
    '/images/rooms/apartments-1/p5.jpg',
    '/images/rooms/apartments-1/p6.jpg',
  ],
  created: '2024-05-11T01:14:42.988Z',
  updated: '2024-05-11T01:14:44.000Z',
};

export const ROOM_STUB: Room = {
  ...ROOM_DTO_STUB,
  roomRemoveError: null,
  roomRemoveRun: false,
  roomChangeError: null,
  roomChangeRun: false,
};

export const ROOMS_STUB: Room[] = [ROOM_STUB];

export const ROOM_LOAD_ERROR = { code: 0, message: 'Failure load rooms' };

export const ENTITY_STUB: Entity = {
  id: ROOM_STUB.id,
};

export const NEW_ROOM_STUB: NewRoom = {
  [RoomField.Person]: 1,
  [RoomField.Building]: 1,
  [RoomField.Guests]: 1,
  [RoomField.Bedrooms]: 1,
  [RoomField.Beds]: 1,
  [RoomField.Bathrooms]: 1,
  [RoomField.Photos]: ['/photo.jpg'],
  [RoomField.Amenities]: [RoomAmenities.Hangers],
  [RoomField.Description]: 'Room description',
  [RoomField.Price]: 1020,
};

export const CHANGED_ROOM_STUB: ChangedRoom = {
  [RoomField.ID]: 1,
  [RoomField.Person]: 1,
  [RoomField.Building]: 1,
  [RoomField.Guests]: 1,
  [RoomField.Bedrooms]: 1,
  [RoomField.Beds]: 1,
  [RoomField.Bathrooms]: 1,
  [RoomField.Photos]: ['/photo.jpg'],
  [RoomField.Amenities]: [RoomAmenities.Hangers],
  [RoomField.Description]: 'Room description',
  [RoomField.Price]: 2000,
};
