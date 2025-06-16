import { BookingVariant, BookingDetails, BookingField } from "@app/models/booking.interface";
import { RoomAmenities } from "@app/models/room.interface";

export const BOOKING_VARIANT_STUB: BookingVariant = {
  id: 1,
  person: 1,
  rooms: [1],
  name: 'Modern Appartment',
  city: 'Sammamish',
  lat: 47.619912,
  lng: -122.054994,
  address: 'Entire rental unit in Sammamish, Washington',
  firstRoom: {
    id: 1,
    building: 1,
    guests: 2,
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 250,
    description: `
    <p>We are partnering with the owners to offer you this breathtaking waterfront property, located in one of the most highly-coveted neighborhoods on the Hood Canal. For a short time only. You don’t want to miss it!</p>
    <h3>The space</h3>
    <p>In this listing you are booking the main house only. Please keep in mind that the driveway, hot tub and the beach access are shared with guests from the guest cottage listing.</p>
    <h3>Guest access</h3>
    <p>The main house</p>
    `,
    amenities: [
      RoomAmenities.AirConditioning,
      RoomAmenities.Elevator,
      RoomAmenities.CarbonMonoxideAlarm,
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
    ],
    photos: ['/images/rooms/apartments-1/p1.jpg'],
    created: '2021-05-11T01:14:42.988Z',
    updated: '2021-05-11T01:14:44.000Z',
    roomRemoveError: null,
    roomRemoveRun: false,
    roomChangeError: null,
    roomChangeRun: false,
  },
  created: '2024-05-11T01:14:42.988Z',
  updated: '2024-05-11T01:14:44.000Z',
  buildingChangeError: null,
  buildingChangeRun: false,
  buildingRemoveError: null,
  buildingRemoveRun: false,
  buildingRoomRemoveRun: false,
  buildingRoomRemoveError: null,
  buildingRoomAddError: null,
  buildingRoomAddRun: false,
};

export const BOOKING_DETAILS_STUB: BookingDetails = {
  [BookingField.Period]: {
    [BookingField.PeriodStart]: '2024-01-01',
    [BookingField.PeriodEnd]: '2024-01-02',
  },
  [BookingField.Guests]: 1,
};
