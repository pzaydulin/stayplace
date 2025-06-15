import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RoomStorage, castRoomEntity, castRoomDto } from './room.storage';
import { LocalStorage } from '@app/storage/local.storage';
import { RoomAmenities, RoomDto, RoomEntity } from '@app/models/room.interface';
import { ROOMS_DTO_STUB } from '@app/data/room.stub';

const ROOMS_STORAGE_KEY = 'rooms';

describe('[core/storage] RoomStorage', () => {
  let service: RoomStorage;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;

  beforeEach(() => {
    // Creating a spy for LocalStorage with setItem and getItem methods
    localStorageSpy = jasmine.createSpyObj('LocalStorage', [
      'setItem',
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        RoomStorage,
        { provide: LocalStorage, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(RoomStorage);
  });

  describe('clear', () => {
    it('should clear the storage by setting an empty array', () => {
      service.clear();
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        ROOMS_STORAGE_KEY,
        []
      );
    });
  });

  describe('get', () => {
    it('should return mapped rooms from LocalStorage when data exists', (done: DoneFn) => {
      
        const roomDto: RoomDto = {
            id: 1,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            building: 1,
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            beds: 1,
            price: 100,
            description: 'Test room description',
            photos: ['room1.jpg'],
            amenities: [RoomAmenities.Wifi, RoomAmenities.Tv],
        };

        const inputData: RoomDto[] = [roomDto];
        // Emulating that localStorage.getItem returns an Observable with data
        localStorageSpy.getItem.and.returnValue(of(inputData));

        service.get().subscribe((result) => {
            // Expected that each RoomDto is transformed to RoomEntity through castRoomEntity
            const expected = inputData.map(castRoomEntity);
            expect(result).toEqual(expected);
            done();
        });
    });

    it('should return ROOMS_DTO_STUB mapped if storage returns null', (done: DoneFn) => {
      // If localStorage.getItem returns null, ROOMS_DTO_STUB is used
      localStorageSpy.getItem.and.returnValue(of(null));

      service.get().subscribe((result) => {
        const expected = ROOMS_DTO_STUB.map(castRoomEntity);
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('post', () => {
    it('should store rooms transformed to DTOs', () => {

        const roomEntity: RoomEntity = {
            id: 2,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            building: 2,
            guests: 3,
            bedrooms: 2,
            bathrooms: 1,
            beds: 2,
            price: 150,
            description: 'Another test room',
            photos: ['room2.jpg'],
            amenities: [RoomAmenities.Wifi, RoomAmenities.Tv],
            roomRemoveRun: false,
            roomRemoveError: null,
            roomChangeRun: false,
            roomChangeError: null,
        };

        const inputEntities: RoomEntity[] = [roomEntity];
        service.post(inputEntities);

        // Expected that each RoomEntity is transformed to RoomDto through castRoomDto
        const expectedDtos = inputEntities.map(castRoomDto);
        expect(localStorageSpy.setItem).toHaveBeenCalledWith(
            ROOMS_STORAGE_KEY,
            expectedDtos
        );
    });

    it('should call setItem with undefined if null is provided', () => {
        service.post(null);
        // If null is passed, rooms?.map(castRoomDto) will return undefined
        expect(localStorageSpy.setItem).toHaveBeenCalledWith(
            ROOMS_STORAGE_KEY,
            undefined
        );
    });
  });

  describe('reset', () => {
    it('should reset the storage to ROOMS_DTO_STUB', () => {
        service.reset();
        expect(localStorageSpy.setItem).toHaveBeenCalledWith(
            ROOMS_STORAGE_KEY,
            ROOMS_DTO_STUB
        );
    });
  });
});
