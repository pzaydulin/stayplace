import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DarkModeService } from '../../../core/data-access/darkmode.service';
import { RouterModule } from '@angular/router';
import { NavigationPath } from '@app/models/navigation.interface';
import { NavPathPipe } from '@app/shared/pipes/nav-path.pipe';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule, RouterModule, NavPathPipe],
  templateUrl: './header.component.html',
  styles: ' :host { --p-toolbar-padding: 0.5rem; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  darkModeService = inject(DarkModeService);
  darkModeOn = computed(() => this.darkModeService.darkModeOn());
  NavigationPath = NavigationPath;

  toggleDarkMode() {
    const element = document.querySelector('html')?.classList;
    element?.toggle('dark-mode');
    this.darkModeService.darkModeOn.set(element?.length !== 0);
  }
}
