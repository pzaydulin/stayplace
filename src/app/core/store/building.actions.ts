import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Entity } from '@app/models/entity.interface';
import { Building, BuildingEntity, ChangeBuildingRoom, ChangedBuilding, ChangedBuildingRoom, NewBuilding } from '@app/models/building.interface';

export const BuildingActions = createActionGroup({
  source: 'Building',
  events: {
    'Load Buildings': emptyProps(),
    'Load Buildings Success': props<{ payload: Building[] }>(),
    'Load Buildings Failure': props<{ payload:Record<string, any> }>(),
    'Clear Buildings': emptyProps(),
    'Clear Buildings Rooms': emptyProps(),
    'Clear Buildings Rooms Cancel': emptyProps(),
    'Clear Buildings Rooms Success': props<{ payload: BuildingEntity[] }>(),
    'Clear Buildings Rooms Failure': props<{ payload:Record<string, any> }>(),
    'Remove Building': props<{ payload: Entity }>(),
    'Remove Building Cancel': emptyProps(),
    'Remove Building Success': props<{ payload: Entity }>(),
    'Remove Building Failure': props<{ payload:Record<string, any> & Entity }>(),
    'Remove Buildings': props<{ payload: number[] }>(),
    'Remove Buildings Cancel': emptyProps(),
    'Remove Buildings Success': props<{ payload: number[] }>(),
    'Remove Buildings Failure': props<{ payload:Record<string, any> & { buildings: number[] } }>(),
    'Remove Building Room': props<{ payload: ChangeBuildingRoom }>(),
    'Remove Building Room Cancel': emptyProps(),
    'Remove Building Room Success': props<{ payload: ChangedBuildingRoom }>(),
    'Remove Building Room Failure': props<{ payload: Record<string, any> & Entity }>(),
    'Add Building': props<{ payload: NewBuilding }>(),
    'Add Building Cancel': emptyProps(),
    'Add Building Success': props<{ payload: BuildingEntity }>(),
    'Add Building Failure':props<{ payload: Record<string, any> }>(),
    'Add Building Room': props<{ payload: ChangeBuildingRoom }>(),
    'Add Building Room Cancel': emptyProps(),
    'Add Building Room Success': props<{ payload: ChangedBuildingRoom }>(),
    'Add Building Room Failure': props<{ payload: Record<string, any> & Entity }>(),
    'Change Building': props<{ payload: ChangedBuilding }>(),
    'Change Building Cancel': emptyProps(),
    'Change Building Success': props<{ payload: ChangedBuilding }>(),
    'Change Building Failure': props<{ payload: Record<string, any> & Entity }>(), 
  },
});
