import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';

@Component({
  selector: 'app-room-person',
  imports: [],
  templateUrl: './room-person.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomPersonComponent {
  readonly room = input.required<RoomExtended>();
}
