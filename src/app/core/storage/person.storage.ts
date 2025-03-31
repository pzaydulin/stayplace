import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorage } from '@app/storage/local.storage';
import { PersonDto, PersonEntity } from '@app/models/person.interface';

import { PERSONS_DTO_STUB } from '@app/data/person.stub';

const PERSON_STORAGE_KEY = 'persons';

export function castPersonEntity(personDto: PersonDto): PersonEntity {
  return {
    ...personDto,
    personRemoveRun: false,
    personRemoveError: null,
    personChangeRun: false,
    personChangeError: null,
    personBuildingRemoveRun: false,
    personBuildingRemoveError: null,
    personBuildingAddRun: false,
    personBuildingAddError: null,
  };
}

// Transforming Entity to Dto. This is a kind of API analog, that when storing data on the server, you can only send there the fields that the entity has on the server (DTO).
export function castPersonDto<T extends PersonEntity = PersonEntity>({
  id,
  created,
  updated,
  firstName,
  lastName,
  middleName,
  phone,
  buildings,
  avatar,
}: T): PersonDto {
  return {
    id,
    created,
    updated,
    firstName,
    lastName,
    middleName,
    phone,
    buildings,
    avatar,
  };
}

@Injectable({
  providedIn: 'root',
})
export class PersonStorage {
  constructor(private readonly localStorage: LocalStorage) {}

  clear(): void {
    this.localStorage.setItem(PERSON_STORAGE_KEY, []);
  }

  get(): Observable<PersonEntity[]> {
    return this.localStorage
      .getItem<PersonDto[] | null>(PERSON_STORAGE_KEY)
      .pipe(map((rooms) => (rooms ?? PERSONS_DTO_STUB).map(castPersonEntity)));
  }

  post(rooms: PersonEntity[] | null): void {
    this.localStorage.setItem(PERSON_STORAGE_KEY, rooms?.map(castPersonDto));
  }

  reset(): void {
    this.localStorage.setItem(PERSON_STORAGE_KEY, PERSONS_DTO_STUB);
  }
}
