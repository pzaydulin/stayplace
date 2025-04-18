import { inject, Injectable } from '@angular/core';
import { Building } from '@app/models/building.interface';
import { Person } from '@app/models/person.interface';
import { Room } from '@app/models/room.interface';
import { BuildingFacade } from '@app/store/building.facade';
import { PersonFacade } from '@app/store/person.facade';
import { RoomFacade } from '@app/store/room.facade';
import { Observable, filter, switchMap, combineLatest, map, of, tap } from 'rxjs';

export interface RoomBuildingExtended extends Building {
  personExtended: Person;
}

export interface RoomExtended extends Room {
  buildingExtended: RoomBuildingExtended;
}

@Injectable({
  providedIn: 'root',
})
export class RoomManagerService {
  private readonly roomFacade: RoomFacade = inject(RoomFacade);
  private readonly buildingFacade: BuildingFacade = inject(BuildingFacade);
  private readonly personFacade: PersonFacade = inject(PersonFacade);

  roomsExtended$: Observable<RoomExtended[]> = this.roomFacade.rooms$.pipe(
    filter<Room[]>(Boolean),
    switchMap((rooms) =>
      rooms.length
        ? combineLatest(
            rooms.map((room) =>
              this.buildingFacade.building$(room.building).pipe(
                filter<any>(Boolean),
                switchMap((building: Building) =>
                  this.personFacade.person$(building.person).pipe(
                    filter<any>(Boolean),
                    map((person) => ({
                      ...room,
                      buildingExtended: {
                        ...building,
                        personExtended: person,
                      },
                    }))
                  )
                )
              )
            )
          )
        : of([])
    )
  );

  roomExtended$ = (id: number): Observable<RoomExtended> =>
    this.roomFacade.room$(id).pipe(
      tap(room => console.log("ROOM:", room)),
      filter<any>(Boolean),
      switchMap((room: Room) =>
        this.buildingFacade.building$(room.building).pipe(
          filter<any>(Boolean),
          switchMap((building: Building) =>
            this.personFacade.person$(building.person).pipe(
              filter<any>(Boolean),
              map((person: Person) => ({
                ...room,
                buildingExtended: {
                  ...building,
                  personExtended: person,
                },
              }))
            )
          )
        )
      )
    );
}
