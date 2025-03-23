import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Entity } from '@app/models/entity.interface';
import { PersonEntity } from '@app/models/person.interface';

import { PERSON_FEATURE_KEY, personAdapter, PersonState } from './person.reducer';

export const selectPersonState = createFeatureSelector<PersonState>(PERSON_FEATURE_KEY);

const { selectAll, selectEntities } = personAdapter.getSelectors();

export const selectPersons = createSelector(selectPersonState, (state) => selectAll(state));

export const selectPersonsEntities = createSelector(selectPersonState, (state) => selectEntities(state));

export const selectPersonsLoadError = createSelector(selectPersonState, (state) => state.personsLoadError);

export const selectPersonsLoadRun = createSelector(selectPersonState, (state) => state.personsLoadRun);

export const selectPersonCreateError = createSelector(selectPersonState, (state) => state.personCreateError);

export const selectPersonCreateRun = createSelector(selectPersonState, (state) => state.personCreateRun);

export const selectPerson = (props: Entity) =>
  createSelector(selectPersonsEntities, (dictionary: Dictionary<PersonEntity>) => dictionary[props.id] ?? null);
