import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { RoomPersonComponent } from "../room-person/room-person.component";
import { RoomPropsComponent } from '../room-props/room-props.component';
import { RoomFeaturesComponent } from "../room-features/room-features.component";
import { RoomDescriptionComponent } from '../room-description/room-description.component';
import { DividerModule } from 'primeng/divider';
import { RoomBookingCardComponent } from "../room-booking-card/room-booking-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-info',
  imports: [
    CommonModule,
    RoomPersonComponent,
    RoomPropsComponent,
    RoomFeaturesComponent,
    RoomDescriptionComponent,
    DividerModule,
    RoomBookingCardComponent
],
  templateUrl: './room-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomInfoComponent {
  room = input.required<RoomExtended>();
  isMobileScreen = input<boolean>(false);
  
}
