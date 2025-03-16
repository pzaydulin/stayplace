import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DarkModeService } from '../../../core/data-access/darkmode.service';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  darkModeService = inject(DarkModeService);
  darkModeOn = computed(() => this.darkModeService.darkModeOn());

  toggleDarkMode() {
    const element = document.querySelector('html')?.classList;
    element?.toggle('dark-mode');
    this.darkModeService.darkModeOn.set(element?.length !== 0);
  }
}
