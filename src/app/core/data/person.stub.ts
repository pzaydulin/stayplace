import { PersonDto } from '@app/models/person.interface';

export const PERSONS_DTO_STUB: PersonDto[] = [
  {
    id: 1,
    lastName: 'Depp',
    firstName: 'John',
    middleName: 'Christopher',
    buildings: [1],
    phone: '5554352026',
    avatar: '/images/persons/avatar-1.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 2,
    lastName: 'Adams',
    firstName: 'Amy',
    middleName: 'Lou',
    buildings: [2],
    phone: '5557652134',
    avatar: '/images/persons/avatar-2.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 3,
    lastName: 'Sharapova',
    firstName: 'Maria',
    middleName: 'Yuryevna', 
    buildings: [3, 4],
    phone: '5557345623',
    avatar: '/images/persons/avatar-3.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
];
