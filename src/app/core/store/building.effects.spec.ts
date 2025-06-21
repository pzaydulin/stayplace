import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BuildingEffects } from './building.effects';
import { BuildingActions } from './building.actions';
import * as BuildingSelectors from './building.selectors';
import { BuildingEntity, NewBuilding } from '@app/models/building.interface';
import {
  BUILDING_STUB,
  BUILDINGS_STUB,
  NEW_BUILDING_STUB,
} from '@app/data/unit-test/building.stub';
import { BuildingStorage } from '@app/storage/building.storage';

describe('[core/store] BuildingEffects', () => {
  let actions$: Observable<any>;
  let effects: BuildingEffects;
  let store: MockStore;
  let storageSpy: jasmine.SpyObj<BuildingStorage>;
  const initialState = {};

  beforeEach(() => {
    const storageMock = jasmine.createSpyObj('BuildingStorage', ['get']);

    TestBed.configureTestingModule({
      providers: [
        BuildingEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: BuildingStorage, useValue: storageMock },
      ],
    });

    effects = TestBed.inject(BuildingEffects);
    store = TestBed.inject(MockStore);
    storageSpy = TestBed.inject(
      BuildingStorage
    ) as jasmine.SpyObj<BuildingStorage>;
  });

  describe('loadBuildings$', () => {
    // TestBed.overrideProvider(BuildingStorage, { useValue: storageMock });

    it('should dispatch loadBuildingsSuccess when storage.get() succeeds', () => {
      const buildings: BuildingEntity[] = BUILDINGS_STUB;

      const action = BuildingActions.loadBuildings();
      const success = BuildingActions.loadBuildingsSuccess({
        payload: buildings,
      });

      actions$ = hot('-a', { a: action });
      const response$ = cold('-b|', { b: buildings });
      storageSpy.get.and.returnValue(response$);

      const expected = cold('--c', { c: success });

      expect(effects.loadBuildings$).toBeObservable(expected);
    });

    it('should dispatch loadBuildingsFailure when storage.get() fails', () => {
      const action = BuildingActions.loadBuildings();
      const error = { code: 0, message: 'Failure load buildings' };
      const failure = BuildingActions.loadBuildingsFailure({ payload: error });

      actions$ = hot('-a', { a: action });
      const response$ = cold('-#|', {}, error);
      storageSpy.get.and.returnValue(response$);

      const expected = cold('--b', { b: failure });

      expect(effects.loadBuildings$).toBeObservable(expected);
    });
  });

  describe('clearBuildingsRooms$', () => {
    it('should dispatch clearBuildingsRoomsSuccess with buildings having empty rooms', () => {
      const buildings: BuildingEntity[] = BUILDINGS_STUB;

      const cleared = buildings.map((b) => ({ ...b, rooms: [] }));

      store.overrideSelector(BuildingSelectors.selectBuildings, buildings);

      const action = BuildingActions.clearBuildingsRooms();
      const expectedAction = BuildingActions.clearBuildingsRoomsSuccess({
        payload: cleared,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: expectedAction });

      expect(effects.clearBuildingsRooms$).toBeObservable(expected);
    });
  });

  describe('removeBuilding$', () => {
    it('should dispatch removeBuildingSuccess if building exists', () => {
      const action = BuildingActions.removeBuilding({
        payload: { id: 1 },
      });

      const buildingsEntities = { 1: BUILDING_STUB };

      store.overrideSelector(
        BuildingSelectors.selectBuildingsEntities,
        buildingsEntities
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: BuildingActions.removeBuildingSuccess({
          payload: { id: 1 },
        }),
      });

      expect(effects.removeBuilding$).toBeObservable(expected);
    });

    it('should dispatch removeBuildingCancel if building does not exist', () => {
      const action = BuildingActions.removeBuilding({
        payload: { id: 999 }, // Non-existing building ID
      });

      const buildingsEntities = { 1: BUILDING_STUB };

      store.overrideSelector(
        BuildingSelectors.selectBuildingsEntities,
        buildingsEntities
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: BuildingActions.removeBuildingCancel(),
      });

      expect(effects.removeBuilding$).toBeObservable(expected);
    });
  });

  describe('addBuilding$', () => {
    it('should dispatch addBuildingSuccess when createBuildingFromNewBuilding succeeds', () => {
      const buildings: BuildingEntity[] = [];

      const newBuilding: NewBuilding = NEW_BUILDING_STUB;

      const createdBuilding: BuildingEntity = {
        ...BUILDING_STUB,
        ...newBuilding,
      };
      // console.log('createdBuilding', createdBuilding);
      store.overrideSelector(BuildingSelectors.selectBuildings, buildings);

      spyOn<any>(
        require('../utils/building.util'),
        'createBuildingFromNewBuilding'
      ).and.returnValue(createdBuilding);

      const action = BuildingActions.addBuilding({ payload: newBuilding });
      const expectedAction = BuildingActions.addBuildingSuccess({
        payload: createdBuilding,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: expectedAction });

      expect(effects.addBuilding$).toBeObservable(expected);
    });

    it('should dispatch addBuildingFailure when createBuildingFromNewBuilding throws error', () => {
      const newBuilding = NEW_BUILDING_STUB;

      const action = BuildingActions.addBuilding({
        payload: newBuilding,
      });

      const buildings: BuildingEntity[] = [];

      store.overrideSelector(BuildingSelectors.selectBuildings, buildings);

      const error = new Error('Error adding building');
      spyOn<any>(
        require('../utils/building.util'),
        'createBuildingFromNewBuilding'
      ).and.throwError(error.message);

      const expectedAction = BuildingActions.addBuildingFailure({
        payload: error,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: expectedAction });

      expect(effects.addBuilding$).toBeObservable(expected);
    });
  });

  describe('removeBuildingRoom$', () => {
    it('should dispatch removeBuildingRoomSuccess when room is removed', () => {
      const action = BuildingActions.removeBuildingRoom({
        payload: { id: 1, room: 1 },
      });

      const buildingsEntities = { 1: BUILDING_STUB };

      store.overrideSelector(
        BuildingSelectors.selectBuildingsEntities,
        buildingsEntities
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: BuildingActions.removeBuildingRoomSuccess({
          payload: {
            id: 1,
            rooms: [2],
          },
        }),
      });

      expect(effects.removeBuildingRoom$).toBeObservable(expected);
    });
  });
});
