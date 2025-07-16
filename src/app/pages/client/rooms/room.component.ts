import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  Signal,
} from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import {
  RoomExtended,
  RoomManagerService,
} from './data-access/room-manager.service';
import { CommonModule } from '@angular/common';
import { RoomHeaderComponent } from './components/room-header/room-header.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { CardModule } from 'primeng/card';
import { RoomPhotoComponent } from './components/room-photo/room-photo.component';
import { RoomInfoComponent } from './components/room-info/room-info.component';
import { BreakpointService } from '@app/data-access/breakpoint.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-room-page',
  imports: [
    CommonModule,
    CardModule,
    RoomHeaderComponent,
    RoomDetailsComponent,
    RoomPhotoComponent,
    RoomInfoComponent,
  ],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  private readonly roomManager: RoomManagerService = inject(RoomManagerService);
  private breakpointService = inject(BreakpointService);

  private titleService: Title = inject(Title);

  isMobileScreen = toSignal(this.breakpointService.breakpoint$, {
    initialValue: false,
  });

  id = input<number>(0);
  roomExtended$!: Observable<RoomExtended>;
  title = '';

  ngOnInit() {
    this.roomExtended$ = this.roomManager.roomExtended$(this.id()).pipe(
      tap((room) => {
        this.title = room.buildingExtended.name;
      })
    );
  }

  ngAfterViewInit() {
    // console.log("Title:",this.title);
    this.titleService.setTitle(this.title);
  }
}
