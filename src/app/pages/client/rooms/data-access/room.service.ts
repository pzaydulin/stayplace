import { inject, Injectable } from '@angular/core';
import { Room } from '@app/models/room.interface';
import { RoomFacade } from '@app/store/room.facade';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly roomFacade: RoomFacade = inject(RoomFacade);
  
  rooms$: Observable<Room[]> = this.roomFacade.rooms$.pipe(filter<Room[]>(Boolean));

  room$ = (id: number): Observable<Room> => this.roomFacade.room$(id).pipe(filter<any>(Boolean));

  roomsByBuilding$ = (id: number): Observable<Room> => this.roomFacade.roomsByBuilding$(id).pipe(filter<any>(Boolean));

}
