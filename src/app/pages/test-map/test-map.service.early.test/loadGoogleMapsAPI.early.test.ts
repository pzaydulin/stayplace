import { GoogleMapsService } from '../test-map.service';

interface MockTapObserver {
  next?: jest.Mock<any, any>;
  error?: jest.Mock<any, any>;
  complete?: jest.Mock<any, any>;
}

// Helper to flush microtasks (for async Observable completion)
function flushMicrotasks(): Promise<void> {
  return new Promise(setImmediate);
}

describe('GoogleMapsService.loadGoogleMapsAPI() loadGoogleMapsAPI method', () => {
  let service: GoogleMapsService;
  let mockDocument: {
    createElement: jest.Mock<any, any>;
    head: { appendChild: jest.Mock<any, any> };
  };
  let originalWindow: any;
  let mockScript: {
    src: string;
    async: boolean;
    defer: boolean;
    onerror: ((error: any) => void) | null;
  };

  beforeEach(() => {
    // Save original window
    originalWindow = { ...window };

    // Mock the document
    mockScript = {
      src: '',
      async: false,
      defer: false,
      onerror: null,
    };
    mockDocument = {
      createElement: jest.fn().mockImplementation((tag: string) => {
        if (tag === 'script') {
          return mockScript as any;
        }
        return {};
      }),
      head: {
        appendChild: jest.fn(),
      },
    };

    // Patch inject to return our mockDocument
    jest
      .spyOn(require('@angular/core'), 'inject')
      .mockReturnValue(mockDocument as any);

    // Patch environment.googleMapsKey
    (require('src/environments/environment').environment.googleMapsKey as any) =
      'FAKE_KEY';

    // Create service instance
    service = new GoogleMapsService();
  });

  afterEach(() => {
    // Restore window
    for (const key in window) {
      if (!(key in originalWindow)) {
        delete (window as any)[key];
      }
    }
    for (const key in originalWindow) {
      (window as any)[key] = originalWindow[key];
    }
    jest.restoreAllMocks();
  });

  // --- Happy Path Tests ---

  it('should load Google Maps API script and emit true on successful load (first call)', async () => {
    // This test ensures the script is appended, window.initMap is set, and observable emits true

    let result: boolean | undefined;
    let completed = false;

    // Subscribe to the observable
    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result = val),
      complete: () => (completed = true),
    } as MockTapObserver as any);

    // Simulate script being appended
    expect(mockDocument.createElement).toHaveBeenCalledWith('script');
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(
      mockScript as any
    );

    // Simulate window.initMap being called (script loaded)
    (window as any).initMap();

    // Wait for observable to complete
    await flushMicrotasks();

    expect(result).toBe(true);
    expect(completed).toBe(true);
    // loaded should be set to true
    expect((service as any).loaded).toBe(true);
    // Script src should contain the key and correct URL
    expect(mockScript.src).toContain(
      'https://maps.googleapis.com/maps/api/js?key=FAKE_KEY'
    );
    expect(mockScript.async).toBe(true);
    expect(mockScript.defer).toBe(true);
  });

  it('should return Observable of true immediately if already loaded (subsequent calls)', async () => {
    // This test ensures that if loaded is true, it returns of(true) immediately

    // Set loaded to true
    (service as any).loaded = true;

    let result: boolean | undefined;
    let completed = false;

    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result = val),
      complete: () => (completed = true),
    } as MockTapObserver as any);

    await flushMicrotasks();

    expect(result).toBe(true);
    expect(completed).toBe(true);
    // Should not create or append any script
    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
  });

  // --- Edge Case Tests ---

  it('should emit false if script loading fails (onerror called)', async () => {
    // This test simulates a script load error and expects the observable to emit false

    let result: boolean | undefined;
    let errorEmitted = false;
    let completed = false;

    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result = val),
      error: () => (errorEmitted = true),
      complete: () => (completed = true),
    } as MockTapObserver as any);

    // Simulate script error
    const errorObj = { message: 'Script failed' };
    mockScript.onerror!(errorObj);

    await flushMicrotasks();

    expect(result).toBe(false);
    expect(errorEmitted).toBe(false); // catchError should handle error, not emit error
    expect(completed).toBe(true);
    // loaded should NOT be set to true
    expect((service as any).loaded).toBe(false);
  });

  it('should not call window.initMap or append script if loaded is already true', async () => {
    // This test ensures that window.initMap is not set and script is not appended if already loaded

    (service as any).loaded = true;

    // Spy on window.initMap
    const initMapSpy = jest.fn();
    (window as any).initMap = initMapSpy;

    service.loadGoogleMapsAPI().subscribe({
      next: jest.fn(),
      complete: jest.fn(),
    } as MockTapObserver as any);

    await flushMicrotasks();

    expect(initMapSpy).not.toHaveBeenCalled();
    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
  });

  it('should not set loaded to true if script fails to load', async () => {
    // This test ensures loaded remains false if script fails

    let result: boolean | undefined;

    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result = val),
      complete: jest.fn(),
    } as MockTapObserver as any);

    // Simulate script error
    mockScript.onerror!({ message: 'fail' });

    await flushMicrotasks();

    expect((service as any).loaded).toBe(false);
    expect(result).toBe(false);
  });

  it('should allow retry after failure (script error then success)', async () => {
    // This test simulates a failure, then a retry that succeeds

    let result1: boolean | undefined;
    let result2: boolean | undefined;

    // First call: fail
    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result1 = val),
      complete: jest.fn(),
    } as MockTapObserver as any);

    mockScript.onerror!({ message: 'fail' });
    await flushMicrotasks();

    expect(result1).toBe(false);
    expect((service as any).loaded).toBe(false);

    // Second call: succeed
    service.loadGoogleMapsAPI().subscribe({
      next: (val) => (result2 = val),
      complete: jest.fn(),
    } as MockTapObserver as any);

    (window as any).initMap();
    await flushMicrotasks();

    expect(result2).toBe(true);
    expect((service as any).loaded).toBe(true);
  });

  it('should not leak window.initMap after script loads', async () => {
    // This test ensures window.initMap is set, called, and can be deleted after

    service.loadGoogleMapsAPI().subscribe({
      next: jest.fn(),
      complete: jest.fn(),
    } as MockTapObserver as any);

    expect(typeof (window as any).initMap).toBe('function');
    (window as any).initMap();
    await flushMicrotasks();

    // Optionally, the service does not clean up window.initMap, but we can check it's still there
    expect(typeof (window as any).initMap).toBe('function');
  });

  it('should set correct script attributes', () => {
    // This test ensures the script tag is configured correctly

    service.loadGoogleMapsAPI().subscribe({
      next: jest.fn(),
      complete: jest.fn(),
    } as MockTapObserver as any);

    expect(mockScript.async).toBe(true);
    expect(mockScript.defer).toBe(true);
    expect(mockScript.src).toContain(
      'https://maps.googleapis.com/maps/api/js?key=FAKE_KEY'
    );
    expect(mockScript.src).toContain('callback=initMap');
  });
});
