import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Room } from '@app/models/room.interface';
import { RoomFacade } from '@app/store/room.facade';
import { Observable } from 'rxjs';
import { RoomService } from 'src/app/core/data-access/room.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private readonly roomFacade: RoomFacade = inject(RoomFacade);
  private readonly roomService: RoomService = inject(RoomService);

  rooms$!: Observable<Room[]>;
  ngOnInit(): void {
    // this.roomFacade.load();

    this.rooms$ = this.roomService.rooms$;
  }
}
