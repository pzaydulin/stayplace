import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';


import { LocalStorage } from '@app/storage/local.storage';
import { BuildingDto, BuildingEntity } from '@app/models/building.interface';
import { BUILDINGS_DTO_STUB } from '@app/data/building.stub';
import { BuildingStorage, castBuilding, castBuildingDto } from './building.storage';

// Knowing that the key is used only within the service, we use its string value
const BUILDING_STORAGE_KEY = 'buildings';

describe('[core/storage] BuildingStorage', () => {
  let service: BuildingStorage;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;

  beforeEach(() => {
    // Create a spy for LocalStorage with setItem and getItem methods
    localStorageSpy = jasmine.createSpyObj('LocalStorage', [
      'setItem',
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        BuildingStorage,
        { provide: LocalStorage, useValue: localStorageSpy },
      ],
    });
    service = TestBed.inject(BuildingStorage);
  });

  describe('clear', () => {
    it('should clear storage by setting an empty array', () => {
      service.clear();
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        BUILDING_STORAGE_KEY,
        []
      );
    });
  });

  describe('get', () => {
    it('should return mapped buildings from LocalStorage when data exists', (done: DoneFn) => {
      // Setting up a mock BuildingDto
      const buildingDto: BuildingDto = {
        id: 1,
        name: 'Test Building',
        rooms: [],
        person: 1,
        city: 'Test City',
        address: '123 Test St',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        lat: 10,
        lng: 20,
      };

      const inputData: BuildingDto[] = [buildingDto];
      // Emulating that localStorage.getItem returns an Observable with data
      localStorageSpy.getItem.and.returnValue(of(inputData));

      service.get().subscribe((result) => {
        // For each dto we expect the castBuilding function to be applied
        const expected = inputData.map(castBuilding);
        expect(result).toEqual(expected);
        done();
      });
    });

    it('should return BUILDINGS_DTO_STUB mapped if storage returns null', (done: DoneFn) => {
      // When localStorage.getItem returns null, we use the BUILDINGS_DTO_STUB as a fallback
      localStorageSpy.getItem.and.returnValue(of(null));

      service.get().subscribe((result) => {
        const expected = BUILDINGS_DTO_STUB.map(castBuilding);
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('post', () => {
    it('should store buildings transformed to DTOs', () => {
      // Setting up a test BuildingEntity
      const buildingEntity: BuildingEntity = {
        id: 1,
        name: 'Entity Building',
        rooms: [],
        person: 1,
        city: 'Entity City',
        address: '456 Entity Ave',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        lat: 30,
        lng: 40,
        buildingRemoveRun: false,
        buildingRemoveError: null,
        buildingChangeRun: false,
        buildingChangeError: null,
        buildingRoomRemoveRun: false,
        buildingRoomRemoveError: null,
        buildingRoomAddRun: false,
        buildingRoomAddError: null,
      };

      const inputEntities: BuildingEntity[] = [buildingEntity];
      service.post(inputEntities);

      // Checking that localStorage.setItem is called with DTOs
      // obtained by applying castBuildingDto to each element.
      const expectedDtos = inputEntities.map(castBuildingDto);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        BUILDING_STORAGE_KEY,
        expectedDtos
      );
    });

    it('should call setItem with undefined mapping if null is provided', () => {
      // If null is passed, it should save undefined (or in our case, undefined result of map)
      service.post(null);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        BUILDING_STORAGE_KEY,
        undefined
      );
    });
  });

  describe('reset', () => {
    it('should reset storage to BUILDINGS_DTO_STUB', () => {
      service.reset();
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        BUILDING_STORAGE_KEY,
        BUILDINGS_DTO_STUB
      );
    });
  });
});
