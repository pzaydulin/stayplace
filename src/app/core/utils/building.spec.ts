import {
  BUILDINGS_STUB,
  NEW_BUILDING_STUB,
} from '@app/test/stubs/building.stub';
import { createBuildingFromNewBuilding } from './building.util';
import { BuildingEntity, NewBuilding } from '@app/models/building.interface';

describe('[core/utils] createBuildingFromNewBuilding', () => {
  it('should create a new building with incremented id and default fields', () => {
    const existingBuildings: BuildingEntity[] = BUILDINGS_STUB;

    const newBuilding: NewBuilding = NEW_BUILDING_STUB;

    const result = createBuildingFromNewBuilding(
      existingBuildings,
      newBuilding
    );

    expect(result.id).toBe(2);
    expect(result.name).toBe('Alex');
    expect(result.rooms).toEqual([1, 2, 3]);
    expect(result.created).toBeTruthy();
    expect(result.updated).toBe(result.created);
    expect(result.buildingRemoveRun).toBeFalse();
    expect(result.buildingRemoveError).toBeNull();
    expect(result.buildingChangeRun).toBeFalse();
    expect(result.buildingChangeError).toBeNull();
    expect(result.buildingRoomRemoveRun).toBeFalse();
    expect(result.buildingRoomRemoveError).toBeNull();
    expect(result.buildingRoomAddRun).toBeFalse();
    expect(result.buildingRoomAddError).toBeNull();
  });

  it('should start with id 2 if buildings list is empty', () => {
    const newBuilding: NewBuilding = NEW_BUILDING_STUB;

    const result = createBuildingFromNewBuilding([], newBuilding);

    expect(result.id).toBe(2); // lastId initialized to 1
  });

  it('should handle undefined building list', () => {
    const newBuilding: NewBuilding = NEW_BUILDING_STUB;

    const result = createBuildingFromNewBuilding(undefined as any, newBuilding);

    expect(result.id).toBe(2); // starts from 1 + 1
  });
});
