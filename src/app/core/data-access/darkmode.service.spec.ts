import { TestBed } from '@angular/core/testing';
import { DarkModeService } from './darkmode.service';


describe('[core/data-access] DarkModeService', () => {
  let service: DarkModeService;

  // A fake object to simulate the classList of element <html>
  let fakeClassList: {
    classes: string[];
    toggle: (className: string) => string[];
    length: number;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);

    // Init fake classList
    fakeClassList = {
      classes: [],
      toggle(className: string) {
        const index = this.classes.indexOf(className);
        if (index > -1) {
          this.classes.splice(index, 1);
        } else {
          this.classes.push(className);
        }
        return this.classes;
      },
      get length() {
        return this.classes.length;
      },
    };

    // Substitution document.querySelector for <html>
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'html') {
        return { classList: fakeClassList };
      }
      return null;
    });
  });

  it('the service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('The method toggleDarkMode should toggle class to the dark-mode and update the darkModeOn signal', () => {
    // Initial state: class "dark-mode" is missing
    fakeClassList.classes = [];

    // First toggle: adding the dark-mode class
    service.toggleDarkMode();
    expect(fakeClassList.classes).toContain('dark-mode');
    expect(service.darkModeOn()).toBe(true);

    // Second toggle: remove class dark-mode
    service.toggleDarkMode();
    expect(fakeClassList.classes).not.toContain('dark-mode');
    expect(service.darkModeOn()).toBe(false);
  });
});
