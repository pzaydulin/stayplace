import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorage } from '@app/storage/local.storage';
import { RoomDto, RoomEntity } from '@app/models/room.interface';

import { ROOMS_DTO_STUB } from '@app/data/room.stub';

const ROOMS_STORAGE_KEY = 'rooms';

export function castRoomEntity(room: RoomDto): RoomEntity {
  return {
    ...room,
    roomRemoveRun: false,
    roomRemoveError: null,
    roomChangeRun: false,
    roomChangeError: null,
  };
}

// Transforming Entity to Dto. This is a kind of API analog, that when storing data on the server, you can only send there the fields that the entity has on the server (DTO).
export function castRoomDto<T extends RoomEntity = RoomEntity>({
  id,
  created,
  updated,
  building,
  guests,
  bedrooms,
  bathrooms,
  beds,
  price,
  description,
  photos,
  amenities,
}: T): RoomDto {
  return {
    id,
    created,
    updated,
    building,
    guests,
    bedrooms,
    bathrooms,
    beds,
    price,
    description,
    photos,
    amenities,
  };
}

@Injectable({
  providedIn: 'root',
})
export class RoomStorage {
  constructor(private readonly localStorage: LocalStorage) {}

  clear(): void {
    this.localStorage.setItem(ROOMS_STORAGE_KEY, []);
  }

  get(): Observable<RoomEntity[]> {
    return this.localStorage
      .getItem<RoomDto[] | null>(ROOMS_STORAGE_KEY)
      .pipe(map((rooms) => (rooms ?? ROOMS_DTO_STUB).map(castRoomEntity)));
  }

  post(rooms: RoomEntity[] | null): void {
    this.localStorage.setItem(ROOMS_STORAGE_KEY, rooms?.map(castRoomDto));
  }

  reset(): void {
    this.localStorage.setItem(ROOMS_STORAGE_KEY, ROOMS_DTO_STUB);
  }
}
