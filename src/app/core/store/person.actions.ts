import { Entity } from '@app/models/entity.interface';
import { PersonEntity, ChangePersonBuilding, ChangedPersonBuilding, NewPerson, ChangedPerson } from '@app/models/person.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PersonActions = createActionGroup({
  source: 'Person',
  events: {
    'Load Persons': emptyProps(),
    'Load Persons Cancel': emptyProps(),
    'Load Persons Success': props<{ payload: PersonEntity[] }>(),
    'Load Persons Failure': props<{ payload: Record<string, any> }>(),
    'Clear Persons': emptyProps(),
    'Clear Persons Buildings': emptyProps(),
    'Clear Persons Buildings Cancel': emptyProps(),
    'Clear Persons Buildings Success': props<{ payload: PersonEntity[] }>(),
    'Clear Persons Buildings Failure': props<{
      payload: Record<string, any>;
    }>(),
    'Remove Person': props<{ payload: Entity }>(),
    'Remove Person Cancel': emptyProps(),
    'Remove Person Success': props<{ payload: Entity }>(),
    'Remove Person Failure': props<{ payload: Record<string, any> & Entity }>(),
    'Remove Person Building': props<{ payload: ChangePersonBuilding }>(),
    'Remove Person Building Cancel': emptyProps(),
    'Remove Person Building Success': props<{ payload: ChangedPersonBuilding }>(),
    'Remove Person Building Failure': props<{
      payload: Record<string, any> & Entity;
    }>(),
    'Add Person': props<{ payload: NewPerson }>(),
    'Add Person Cancel': emptyProps(),
    'Add Person Success': props<{ payload: PersonEntity }>(),
    'Add Person Failure': props<{ payload: Record<string, any> }>(),
    'Add Person Building': props<{ payload: ChangePersonBuilding }>(),
    'Add Person Building Cancel': emptyProps(),
    'Add Person Building Success': props<{ payload: ChangedPersonBuilding }>(),
    'Add Person Building Failure': props<{ payload: Record<string, any> & Entity }>(),
    'Change Person': props<{ payload: ChangedPerson }>(),
    'Change Person Cancel': emptyProps(),
    'Change Person Success': props<{ payload: ChangedPerson }>(),
    'Change Person Failure': props<{ payload: Record<string, any> & Entity }>(),
  },
});
