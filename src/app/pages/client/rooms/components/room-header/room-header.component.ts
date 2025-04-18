import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-room-header',
  imports: [CommonModule, ButtonModule],
  templateUrl: './room-header.component.html',
  styleUrl: './room-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomHeaderComponent {
  readonly room = input.required<RoomExtended>();
  // private readonly navigationService: NavigationService;

  onBack(): void {
    // void this.navigationService.navigateByUrl(NavigationPath.Home);
  }
}
