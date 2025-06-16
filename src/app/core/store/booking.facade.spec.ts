import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { BookingFacade } from './booking.facade';
import { BookingState } from './booking.reducer';
import { BookingActions } from './booking.actions';
import { BOOKING_DETAILS_STUB, BOOKING_VARIANT_STUB } from '@app/test/stubs/booking.stub';

describe('[core/store] BookingFacade', () => {
  let facade: BookingFacade;
  let storeSpy: jasmine.SpyObj<Store<BookingState>>;

  beforeEach(() => {
    // Create a spy for Store with dispatch and select methods
    const spy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    TestBed.configureTestingModule({
      providers: [BookingFacade, { provide: Store, useValue: spy }],
    });

    facade = TestBed.inject(BookingFacade);
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store<BookingState>>;

    // storeSpy.select.and.callFake((selector: any) => {
    //   // By selector, return primitive stubs to check facade.bookingVariant$ and bookingDetails$ subscriptions
    //   if (selector === BookingSelectors.selectBookingVariant) {
    //     return of({ firstRoom: { id: 99 } }); // BookingVariant
    //   }
    //   if (selector === BookingSelectors.selectBookingDetails) {
    //     return of({ guests: 1 }); // BookingDetails
    //   }
    //   return of();
    // });
  });

  it('selectBookingVariant should dispatch setBookingDetails action', () => {
    const payload = BOOKING_VARIANT_STUB;
    facade.setBookingVariant(payload);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      BookingActions.setBookingVariant({ payload })
    );
  });

  it('setBookingDetails should dispatch setBookingDetails action', () => {
    const payload = BOOKING_DETAILS_STUB;
    facade.setBookingDetails(payload);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      BookingActions.setBookingDetails({ payload })
    );
  });

  it('clearBookingVariant should dispatch clearBookingVariant action', () => {
    facade.clearBookingVariant();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      BookingActions.clearBookingVariant()
    );
  });

  it('clearBookingDetails should dispatch clearBookingDetails action', () => {
    facade.clearBookingDetails();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      BookingActions.clearBookingDetails()
    );
  });
});
