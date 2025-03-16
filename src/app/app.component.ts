import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/data-access/darkmode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  darkModeService = inject(DarkModeService);

  darkModeOn = computed(() => this.darkModeService.darkModeOn());
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  ngOnInit() {
    if (this.darkModeOn()) {
      this.toggleDarkMode();
    }
  }
}
