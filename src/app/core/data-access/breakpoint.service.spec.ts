import { TestBed } from '@angular/core/testing';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { BreakpointService } from './breakpoint.service';

describe('[core/data-access] BreakpointService', () => {
  let service: BreakpointService;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let breakpointSubject: Subject<BreakpointState>;

  beforeEach(() => {
    // Create a Subject that we will use to simulate observation
    breakpointSubject = new Subject<BreakpointState>();

    // Create a spy for BreakpointObserver with the observe method
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    breakpointObserverSpy.observe.and.returnValue(
      breakpointSubject.asObservable()
    );

    TestBed.configureTestingModule({
      providers: [
        BreakpointService,
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    });
    service = TestBed.inject(BreakpointService);
  });

  it('should be initialized with default value false', () => {
    // Since the initialValue is set to false in toSignal, we expect false
    expect(service.breakpoint()).toBeFalse();
  });

  it('should update signal value on observation event', (done: DoneFn) => {
    // Emulate an event where breakpoints for HandsetPortrait are set to true
    const fakeBreakpointState: BreakpointState = {
      matches: true,
      breakpoints: { [Breakpoints.HandsetPortrait]: true },
    };

    // Send the event through our Subject
    breakpointSubject.next(fakeBreakpointState);

    // For giving time to the signal to update, we use setTimeout
    setTimeout(() => {
      expect(service.breakpoint()).toBeTrue();
      done();
    }, 0);
  });
});
