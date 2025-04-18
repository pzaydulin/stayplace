import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-details',
  imports: [CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailsComponent {
  readonly room = input.required<RoomExtended>();
}
