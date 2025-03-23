import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity } from '@app/models/entity.interface';
import { BuildingActions } from './building.actions';
import { BuildingState } from './building.reducer';
import * as BuildingSelectors from './building.selectors';
import { Building, ChangedBuilding, NewBuilding, ChangeBuildingRoom } from '@app/models/building.interface';

@Injectable({
  providedIn: 'root',
})
export class BuildingFacade {

  private readonly store: Store<BuildingState> = inject(Store);
  private readonly actions: Actions = inject(Actions);

  buildings$: Observable<Building[]> = this.store.pipe(
    select(BuildingSelectors.selectBuildings)
  );

  buildingsLoadError$ = this.store.select(BuildingSelectors.selectBuildingsLoadError);

  buildingsLoadRun$ = this.store.select(BuildingSelectors.selectBuildingsLoadRun);

  buildingAdded$: Observable<Building> = this.actions.pipe(
    ofType(BuildingActions.addBuildingSuccess),
    map((action) => action.payload)
  );

  buildingChanged$: Observable<ChangedBuilding> = this.actions.pipe(
    ofType(BuildingActions.changeBuildingSuccess),
    map((action) => action.payload)
  );

  building$ = (id: number): Observable<Building | null> =>
    this.store.pipe(select(BuildingSelectors.selectBuilding({ id })));

  buildingsByPerson$ = (id: number): Observable<Building[]> =>
    this.store.pipe(select(BuildingSelectors.selectBuildingsByPerson({ id })));

  clear(): void {
    this.dispatch(BuildingActions.clearBuildings());
  }

  clearBuildingsRooms(): void {
    this.dispatch(BuildingActions.clearBuildingsRooms());
  }

  load(): void {
    this.dispatch(BuildingActions.loadBuildings());
  }

  addBuilding(payload: NewBuilding): void {
    this.dispatch(BuildingActions.addBuilding({ payload }));
  }

  removeBuilding(payload: Entity): void {
    this.dispatch(BuildingActions.removeBuilding({ payload }));
  }

  removeBuildings(payload: number[]): void {
    this.dispatch(BuildingActions.removeBuildings({ payload }));
  }

  addBuildingRoom(payload: ChangeBuildingRoom): void {
    this.dispatch(BuildingActions.addBuildingRoom({ payload }));
  }

  removeBuildingRoom(payload: ChangeBuildingRoom): void {
    this.dispatch(BuildingActions.removeBuildingRoom({ payload }));
  }

  changeBuilding(payload: ChangedBuilding): void {
    this.dispatch(BuildingActions.changeBuilding({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
