import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { RoomNameFromNumberPipe, RoomType } from '../../pipes/room-name-from-number.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-props',
  imports: [CommonModule, RoomNameFromNumberPipe],
  templateUrl: './room-props.component.html',
  styleUrls: ['./room-props.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomPropsComponent {
  readonly room = input.required<RoomExtended>();

  RoomType = RoomType;
}
