import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersonStorage, castPersonEntity, castPersonDto } from './person.storage';
import { LocalStorage } from '@app/storage/local.storage';
import { PersonDto, PersonEntity } from '@app/models/person.interface';
import { PERSONS_DTO_STUB } from '@app/data/person.stub';

const PERSON_STORAGE_KEY = 'persons';

describe('[core/storage] PersonStorage', () => {
  let service: PersonStorage;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;

  beforeEach(() => {
    // Creating a spy for LocalStorage with setItem and getItem methods
    localStorageSpy = jasmine.createSpyObj('LocalStorage', [
      'setItem',
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PersonStorage,
        { provide: LocalStorage, useValue: localStorageSpy },
      ],
    });
    service = TestBed.inject(PersonStorage);
  });

  describe('clear', () => {
    it('should clear the storage by setting an empty array', () => {
      service.clear();
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        PERSON_STORAGE_KEY,
        []
      );
    });
  });

  describe('get', () => {
    it('should return mapped persons from LocalStorage when data exists', (done: DoneFn) => {
      // Creating a test PersonDto object
      const personDto: PersonDto = {
        id: 1,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'M.',
        phone: '1234567890',
        buildings: [],
        avatar: 'avatar.png',
      };

      const inputData: PersonDto[] = [personDto];
      // Emulating that localStorage.getItem returns an Observable with data
      localStorageSpy.getItem.and.returnValue(of(inputData));

      service.get().subscribe((result) => {
        const expected = inputData.map(castPersonEntity);
        expect(result).toEqual(expected);
        done();
      });
    });

    it('should return PERSONS_DTO_STUB mapped if storage returns null', (done: DoneFn) => {
      // If localStorage.getItem returns null, PERSONS_DTO_STUB is used
      localStorageSpy.getItem.and.returnValue(of(null));

      service.get().subscribe((result) => {
        const expected = PERSONS_DTO_STUB.map(castPersonEntity);
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('post', () => {
    it('should store persons transformed to DTOs', () => {
      const personEntity: PersonEntity = {
        id: 2,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        firstName: 'Jane',
        lastName: 'Smith',
        middleName: 'A.',
        phone: '0987654321',
        buildings: [],
        avatar: 'avatar2.png',
        personRemoveRun: false,
        personRemoveError: null,
        personChangeRun: false,
        personChangeError: null,
        personBuildingRemoveRun: false,
        personBuildingRemoveError: null,
        personBuildingAddRun: false,
        personBuildingAddError: null,
      };

      const inputEntities: PersonEntity[] = [personEntity];
      service.post(inputEntities);

      // Expecting that each PersonEntity will be transformed to DTO using castPersonDto
      const expectedDtos = inputEntities.map(castPersonDto);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        PERSON_STORAGE_KEY,
        expectedDtos
      );
    });

    it('should call setItem with undefined if null is provided', () => {
      // If null is passed, rooms?.map(castPersonDto) will return undefined
      service.post(null);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        PERSON_STORAGE_KEY,
        undefined
      );
    });
  });

  describe('reset', () => {
    it('should reset the storage to PERSONS_DTO_STUB', () => {
      service.reset();
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        PERSON_STORAGE_KEY,
        PERSONS_DTO_STUB
      );
    });
  });
});
