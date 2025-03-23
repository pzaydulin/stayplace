import { PersonDto } from '@app/models/person.interface';

export const PERSONS_DTO_STUB: PersonDto[] = [
  {
    id: 1,
    lastName: 'Иванов',
    firstName: 'Дмитрий',
    middleName: 'Сергеевич',
    buildings: [1],
    phone: '9231002020',
    avatar: '/images/persons/avatar-1.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 2,
    lastName: 'Смирнова',
    firstName: 'Мария',
    middleName: 'Александровна',
    buildings: [2],
    phone: '9139002010',
    avatar: '/images/persons/avatar-2.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
  {
    id: 3,
    lastName: 'Полякова',
    firstName: 'Евгения',
    middleName: 'Семеновна',
    buildings: [3, 4],
    phone: '9139002099',
    avatar: '/images/persons/avatar-3.jpg',
    created: '2024-05-11T01:14:42.988Z',
    updated: '2024-05-11T01:14:44.000Z',
  },
];
