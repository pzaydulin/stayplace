import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { GoogleMapsService } from './map.service';

describe('[core/data-access] GoogleMapsService', () => {
  let service: GoogleMapsService;
  let fakeDocument: Document;
  let fakeHead: { appendChild: jasmine.Spy };
  let scriptElement: any;
  const fakeGoogleMapsKey = 'FAKE-KEY';

  beforeEach(() => {
    // Create a fake <script> element
    scriptElement = {} as HTMLScriptElement;

    // fakeHead with a spy for appendChild
    fakeHead = {
      appendChild: jasmine
        .createSpy('appendChild')
        .and.callFake((element: any) => {
          // Can save the element for further checks, e.g., for src
          // scriptElement = element;
          return element;
        }),
    };

    // fakeDocument with a spy for createElement and head
    fakeDocument = {
      createElement: jasmine
        .createSpy('createElement')
        .and.callFake((tag: string) => {
          if (tag === 'script') {
            return scriptElement;
          }
          return null;
        }),
      head: fakeHead,
    } as unknown as Document;

    // // Spy on the environment variable to return a fake key
    // spyOnProperty(environment, 'googleMapsKey', 'get').and.returnValue(
    //   fakeGoogleMapsKey
    // );

    // redefine the environment variable to use a fake key
    environment.googleMapsKey = fakeGoogleMapsKey;

    // Configure the testing module with the GoogleMapsService and provide a fakeDocument
    TestBed.configureTestingModule({
      providers: [
        GoogleMapsService,
        { provide: DOCUMENT, useValue: fakeDocument },
      ],
    });
    service = TestBed.inject(GoogleMapsService);

    // Remove any previous definition of window.initMap
    delete (window as any).initMap;
  });

  it('should successfully load Google Maps API', (done: DoneFn) => {
    // Subscribe to the API loading
    service.loadGoogleMapsAPI().subscribe({
      next: (result) => {
        expect(result).toBeTrue();
      },
      complete: () => {
        expect(fakeDocument.createElement).toHaveBeenCalledWith('script');
        expect(fakeHead.appendChild).toHaveBeenCalledWith(scriptElement);
        done();
      },
      error: done.fail,
    });

    // Check that the script element was created with the correct src
    expect(scriptElement.src).toContain(
      `https://maps.googleapis.com/maps/api/js?key=${fakeGoogleMapsKey}`
    );
    expect(scriptElement.async).toBe(true);
    expect(scriptElement.defer).toBe(true);

    // Emulate successful API loading by calling the callback
    (window as any).initMap();
  });

  it('should handle script loading error and return false', (done: DoneFn) => {
    service.loadGoogleMapsAPI().subscribe({
      next: (result) => {
        expect(result).toBeFalse();
      },
      complete: () => {
        done();
      },
      error: done.fail,
    });

    // Emulate a script loading error
    const errorEvent = new ErrorEvent('error', {
      error: new Error('Failed to load script'),
    });
    // If defined, call the error handler of scriptElement
    if (typeof scriptElement.onerror === 'function') {
      scriptElement.onerror(errorEvent);
    }
  });

  it('should return true immediately if API is already loaded', (done: DoneFn) => {
    // First call: simulate API loading
    service.loadGoogleMapsAPI().subscribe({
      complete: () => {
        // After the first successful load, the internal flag `loaded` is set to true.
        // The second call should immediately return true without adding a new script.
        service.loadGoogleMapsAPI().subscribe((result) => {
          expect(result).toBeTrue();
          done();
        });
      },
      error: done.fail,
    });
    (window as any).initMap();
  });
});
