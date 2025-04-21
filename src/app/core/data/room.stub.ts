import { RoomAmenities, RoomDto } from '@app/models/room.interface';

/* eslint-disable max-len */
export const ROOMS_DTO_STUB: RoomDto[] = [
  {
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
    description:
      'Уютная квартира в самом центре города. В шаговой доступности НИИТО, стадион Спартак, центральный парк, жд вокзал, метро, площадь Ленина.',
    photos: [
      '/images/rooms/photo-22.jpg',
      '/images/rooms/photo-23.jpg',
      '/images/rooms/photo-24.jpg',
      '/images/rooms/photo-10.jpg',
      '/images/rooms/photo-11.jpg',
      '/images/rooms/photo-12.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 2,
    building: 2,
    guests: 3,
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 275,
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
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.HairDryer,
    ],
    photos: [
      '/images/rooms/photo-3.jpg',
      '/images/rooms/photo-1.jpg',
      '/images/rooms/photo-22.jpg',
      '/images/rooms/photo-13.jpg',
      '/images/rooms/photo-14.jpg',
      '/images/rooms/photo-15.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 3,
    building: 2,
    guests: 3,
    beds: 2,
    bedrooms: 2,
    bathrooms: 1,
    price: 540,
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
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-4.jpg',
      '/images/rooms/photo-5.jpg',
      '/images/rooms/photo-6.jpg',
      '/images/rooms/photo-16.jpg',
      '/images/rooms/photo-17.jpg',
      '/images/rooms/photo-18.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 4,
    building: 3,
    guests: 2,
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 180,
    description: `
      <p>We are partnering with the owners to offer you this breathtaking waterfront property, located in one of the most highly-coveted neighborhoods on the Hood Canal. For a short time only. You don’t want to miss it!</p>
      <h3>The space<h3>
      <p>In this listing you are booking the main house only. Please keep in mind that the driveway, hot tub and the beach access are shared with guests from the guest cottage listing.</p>
      <h3>Guest access</h3>
      <p>The main house</p>
      `,
    amenities: [
      RoomAmenities.AirConditioning,
      RoomAmenities.Elevator,
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-7.jpg',
      '/images/rooms/photo-8.jpg',
      '/images/rooms/photo-9.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 5,
    building: 3,
    guests: 3,
    beds: 2,
    bedrooms: 2,
    bathrooms: 1,
    price: 380,
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
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-10.jpg',
      '/images/rooms/photo-11.jpg',
      '/images/rooms/photo-12.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 6,
    building: 3,
    guests: 4,
    beds: 2,
    bedrooms: 2,
    bathrooms: 2,
    price: 680,
    description:
      'Уютная квартира в самом центре города. В шаговой доступности НИИТО, стадион Спартак, центральный парк, жд вокзал, метро, площадь Ленина.',
    amenities: [
      RoomAmenities.AirConditioning,
      RoomAmenities.Elevator,
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-13.jpg',
      '/images/rooms/photo-14.jpg',
      '/images/rooms/photo-15.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 7,
    building: 4,
    guests: 2,
    beds: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 220,
    description:
      'Уютная квартира в самом центре города. В шаговой доступности НИИТО, стадион Спартак, центральный парк, жд вокзал, метро, площадь Ленина.',
    amenities: [
      RoomAmenities.AirConditioning,
      RoomAmenities.Elevator,
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-16.jpg',
      '/images/rooms/photo-17.jpg',
      '/images/rooms/photo-18.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 8,
    building: 4,
    guests: 6,
    beds: 3,
    bedrooms: 3,
    bathrooms: 2,
    price: 680,
    description:
      'Уютная квартира в самом центре города. В шаговой доступности НИИТО, стадион Спартак, центральный парк, жд вокзал, метро, площадь Ленина.',
    amenities: [
      RoomAmenities.AirConditioning,
      RoomAmenities.Elevator,
      RoomAmenities.Hangers,
      RoomAmenities.Tv,
      RoomAmenities.Towels,
      RoomAmenities.Kitchen,
    ],
    photos: [
      '/images/rooms/photo-19.jpg',
      '/images/rooms/photo-20.jpg',
      '/images/rooms/photo-21.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
];
/* eslint-enable max-len */
