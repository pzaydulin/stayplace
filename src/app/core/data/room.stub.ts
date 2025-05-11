import { RoomAmenities, RoomDto } from '@app/models/room.interface';

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
      '/images/rooms/house-1/p1.jpg',
      '/images/rooms/house-1/p2.jpg',
      '/images/rooms/house-1/p3.jpg',
      '/images/rooms/house-1/p4.jpg',
      '/images/rooms/p5.jpg',
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
    price: 240,
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
      '/images/rooms/house-2/p1.jpg',
      '/images/rooms/house-2/p2.jpg',
      '/images/rooms/house-2/p3.jpg',
      '/images/rooms/house-2/p4.jpg',
      '/images/rooms/house-2/p5.jpg',
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
    price: 345,
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
      '/images/rooms/lake-2/p1.jpg',
      '/images/rooms/lake-2/p2.jpg',
      '/images/rooms/lake-2/p3.jpg',
      '/images/rooms/lake-2/p4.jpg',
      '/images/rooms/lake-2/p5.jpg',
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
      '/images/rooms/lake-1/p1.jpg',
      '/images/rooms/lake-1/p2.jpg',
      '/images/rooms/lake-1/p3.jpg',
      '/images/rooms/lake-1/p4.jpg',
      '/images/rooms/lake-1/p5.jpg',
      '/images/rooms/lake-1/p6.jpg',
      '/images/rooms/lake-1/p7.jpg',
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
    price: 320,
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
      '/images/rooms/p1.jpg',
      '/images/rooms/p2.jpg',
      '/images/rooms/p3.jpg',
      '/images/rooms/p4.jpg',
      '/images/rooms/p6.jpg',
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
      '/images/rooms/p5.jpg',
      '/images/rooms/p6.jpg',
      '/images/rooms/p7.jpg',
      '/images/rooms/p8.jpg',
      '/images/rooms/p9.jpg',
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
      '/images/rooms/p10.jpg',
      '/images/rooms/p9.jpg',
      '/images/rooms/p5.jpg',
      '/images/rooms/p11.jpg',
      '/images/rooms/p12.jpg',
    ],
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
];
