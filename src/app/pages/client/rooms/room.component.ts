import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomExtended, RoomManagerService } from './data-access/room-manager.service';
import { CommonModule } from '@angular/common';
import { RoomHeaderComponent } from "./components/room-header/room-header.component";
import { RoomDetailsComponent } from "./components/room-details/room-details.component";
import { CardModule } from 'primeng/card';
import { RoomPhotoComponent } from "./components/room-photo/room-photo.component";
import { RoomInfoComponent } from "./components/room-info/room-info.component";

@Component({
  selector: 'app-room-page',
  imports: [
    CommonModule, 
    CardModule, 
    RoomHeaderComponent, 
    RoomDetailsComponent, 
    RoomPhotoComponent, 
    RoomInfoComponent
  ],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  private readonly roomManager: RoomManagerService = inject(RoomManagerService);

  id = input<number>(0);
  roomExtended$!: Observable<RoomExtended>;

  ngOnInit() {
    this.roomExtended$ = this.roomManager.roomExtended$(
      this.id()
    );
  }
}
