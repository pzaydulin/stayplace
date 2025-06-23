import {
  Building,
  BuildingField,
  ChangedBuilding,
  NewBuilding,
} from '@app/models/building.interface';
import { Entity } from '@app/models/entity.interface';

export const BUILDING_STUB: Building = {
  id: 1,
  person: 1,
  rooms: [1, 2],
  name: 'Modern Appartment',
  city: 'Sammamish',
  lat: 47.619912,
  lng: -122.054994,
  address: 'Entire rental unit in Sammamish, Washington',
  created: '2024-05-11T01:14:42.988Z',
  updated: '2024-05-11T01:14:44.000Z',
  buildingChangeRun: false,
  buildingChangeError: null,
  buildingRemoveRun: false,
  buildingRemoveError: null,
  buildingRoomRemoveRun: false,
  buildingRoomRemoveError: null,
  buildingRoomAddRun: false,
  buildingRoomAddError: null,
};

export const BUILDINGS_STUB: Building[] = [BUILDING_STUB];

export const BUILDINGS_LOAD_ERROR = {
  code: 0,
  message: 'Failure load buildings',
};

export const ENTITY_STUB: Entity = {
  id: 1,
};

export const NEW_BUILDING_STUB: NewBuilding = {
  [BuildingField.Name]: 'Alex',
  [BuildingField.Rooms]: [1, 2, 3],
  [BuildingField.Person]: 1,
  [BuildingField.City]: 'City',
  [BuildingField.Address]: 'New Address',
  [BuildingField.Created]: '2025-01-02',
  [BuildingField.Updated]: '2025-01-02',
  [BuildingField.Lat]: 10.01,
  [BuildingField.Lng]: 20.01,
};

export const CHANGED_BUILDING_STUB: ChangedBuilding = {
  [BuildingField.ID]: 1,
  [BuildingField.Rooms]: [1, 2, 3],
  [BuildingField.Person]: 1,
  [BuildingField.City]: 'City',
  [BuildingField.Address]: 'New Address',
  [BuildingField.Created]: '2025-01-02',
  [BuildingField.Updated]: '2025-01-02',
  [BuildingField.Lat]: 10.01,
  [BuildingField.Lng]: 20.01,
};
