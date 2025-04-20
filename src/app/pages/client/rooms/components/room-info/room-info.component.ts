import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { RoomPersonComponent } from "../room-person/room-person.component";
import { RoomPropsComponent } from '../room-props/room-props.component';
import { RoomFeaturesComponent } from "../room-features/room-features.component";
import { RoomDescriptionComponent } from '../room-description/room-description.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-room-info',
  imports: [
    RoomPersonComponent, 
    RoomPropsComponent, 
    RoomFeaturesComponent,
    RoomDescriptionComponent,
    DividerModule,
  ],
  templateUrl: './room-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomInfoComponent {
  readonly room = input.required<RoomExtended>();
}
