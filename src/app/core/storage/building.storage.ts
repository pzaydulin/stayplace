import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorage } from '@app/storage/local.storage';
import { BuildingDto, BuildingEntity } from '@app/models/building.interface';

import { BUILDINGS_DTO_STUB } from '@app/data/building.stub';

const BUILDING_STORAGE_KEY = 'buildings';

export function castBuilding(building: BuildingDto): BuildingEntity {
  return {
    ...building,
    buildingRemoveRun: false,
    buildingRemoveError: null,
    buildingChangeRun: false,
    buildingChangeError: null,
    buildingRoomRemoveRun: false,
    buildingRoomRemoveError: null,
    buildingRoomAddRun: false,
    buildingRoomAddError: null,
  };
}
//  Transforming Entity to Dto. This is a kind of API analog, that when storing data on the server, you can only send there the fields that the entity has on the server (DTO).
export function castBuildingDto<T extends BuildingEntity = BuildingEntity>({
  id,
  name,
  rooms,
  person,
  city,
  address,
  created,
  updated,
  lat,
  lng,
}: T): BuildingDto {
  return {
    id,
    name,
    rooms,
    person,
    city,
    address,
    created,
    updated,
    lat,
    lng,
  };
}

@Injectable({
  providedIn: 'root'
})
export class BuildingStorage {
  constructor(private readonly localStorage: LocalStorage) {}

  clear(): void {
    this.localStorage.setItem(BUILDING_STORAGE_KEY, []);
  }

  get(): Observable<BuildingEntity[]> {
    return this.localStorage
      .getItem<BuildingDto[] | null>(BUILDING_STORAGE_KEY)
      .pipe(map((buildings) => (buildings ?? BUILDINGS_DTO_STUB).map(castBuilding)));
  }

  post(rooms: BuildingEntity[] | null): void {
    this.localStorage.setItem(BUILDING_STORAGE_KEY, rooms?.map(castBuildingDto));
  }

  reset(): void {
    this.localStorage.setItem(BUILDING_STORAGE_KEY, BUILDINGS_DTO_STUB);
  }
}
