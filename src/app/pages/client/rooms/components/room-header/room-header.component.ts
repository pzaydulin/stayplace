import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavPathPipe } from '@app/shared/pipes/nav-path.pipe';
import { RouterModule } from '@angular/router';
import { NavigationPath } from '@app/models/navigation.interface';

@Component({
  selector: 'app-room-header',
  imports: [CommonModule, ButtonModule, RouterModule, NavPathPipe],
  templateUrl: './room-header.component.html',
  styleUrl: './room-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomHeaderComponent {
  readonly room = input.required<RoomExtended>();
  NavigationPath = NavigationPath;
  
  // private readonly navigationService: NavigationService;

  onBack(): void {
    // void this.navigationService.navigateByUrl(NavigationPath.Home);
  }
}
