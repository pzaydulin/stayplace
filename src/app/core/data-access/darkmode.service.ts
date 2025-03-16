import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkModeOn = signal(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  toggleDarkMode() {
    const element = document.querySelector('html')?.classList;
    element?.toggle('dark-mode');
    this.darkModeOn.set(element?.length !== 0);
  }
}
