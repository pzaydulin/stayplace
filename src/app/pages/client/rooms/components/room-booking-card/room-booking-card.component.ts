import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { CommonModule } from '@angular/common';
import { RoomBookingFormComponent } from "./components/room-booking-form/room-booking-form.component";

@Component({
  selector: 'app-room-booking-card',
  imports: [CommonModule, RoomBookingFormComponent],
  templateUrl: './room-booking-card.component.html',
  styleUrl: './room-booking-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomBookingCardComponent {
  readonly room = input.required<RoomExtended>();
  isMobileScreen = input<boolean>(false);
}
