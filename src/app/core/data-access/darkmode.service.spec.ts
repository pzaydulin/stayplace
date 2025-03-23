import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './darkmode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;

  beforeEach(() => {
    // Mock for window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
      })),
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize darkModeOn correctly', () => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    expect(service.darkModeOn()).toBe(prefersDark);
  });

  it('should toggle dark mode class and update darkModeOn', () => {
    const htmlElement = document.createElement('html');
    document.body.appendChild(htmlElement);

    // Mock querySelector to return the test element
    jest.spyOn(document, 'querySelector').mockReturnValue(htmlElement);

    // Toggle dark mode on
    service.toggleDarkMode();
    expect(htmlElement.classList.contains('dark-mode')).toBe(true);
    expect(service.darkModeOn()).toBe(true);

    // Toggle dark mode off
    service.toggleDarkMode();
    expect(htmlElement.classList.contains('dark-mode')).toBe(false);
    expect(service.darkModeOn()).toBe(false);

    // Clean up
    document.body.removeChild(htmlElement);
  });
});
