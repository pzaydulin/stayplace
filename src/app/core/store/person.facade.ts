import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonActions } from './person.actions';
import { PersonState } from './person.reducer';
import * as PersonSelectors from './person.selectors';
import { Entity } from '@app/models/entity.interface';
import { Person, ChangePersonBuilding, NewPerson, ChangedPerson } from '@app/models/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonFacade {
  private readonly store: Store<PersonState> = inject(Store);
  private readonly actions: Actions = inject(Actions);

  persons$: Observable<Person[]> = this.store.pipe(
    select(PersonSelectors.selectPersons)
  );

  personsLoadError$ = this.store.select(PersonSelectors.selectPersonsLoadError);

  personsLoadRun$ = this.store.select(PersonSelectors.selectPersonsLoadRun);

  personAdded$: Observable<Person> = this.actions.pipe(
    ofType(PersonActions.addPersonSuccess),
    map((action) => action.payload)
  );

  personChanged$ = this.actions.pipe(
    ofType(PersonActions.changePersonSuccess),
    map((action) => action.payload)
  );

  person$ = (id: number): Observable<Person | null> =>
    this.store.select(PersonSelectors.selectPerson({ id }));

  clear(): void {
    this.dispatch(PersonActions.clearPersons());
  }

  clearPersonsBuildings(): void {
    this.dispatch(PersonActions.clearPersonsBuildings());
  }

  load(): void {
    this.dispatch(PersonActions.loadPersons());
  }

  removePerson(payload: Entity): void {
    this.dispatch(PersonActions.removePerson({ payload }));
  }

  removePersonBuilding(payload: ChangePersonBuilding): void {
    this.dispatch(PersonActions.removePersonBuilding({ payload }));
  }

  addPersonBuilding(payload: ChangePersonBuilding): void {
    this.dispatch(PersonActions.addPersonBuilding({ payload }));
  }

  addPerson(payload: NewPerson): void {
    this.dispatch(PersonActions.addPerson({ payload }));
  }

  changePerson(payload: ChangedPerson): void {
    this.dispatch(PersonActions.changePerson({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
