import { BookingState, bookingInitialState, reducer } from './booking.reducer';
import { BookingActions } from './booking.actions';
import { BOOKING_DETAILS_STUB, BOOKING_VARIANT_STUB } from '@app/test/stubs/booking.stub';

describe('[core/store] Booking Reducer', () => {

  const dummyVariant = BOOKING_VARIANT_STUB; // type BookingVariant
  const dummyDetails = BOOKING_DETAILS_STUB; // type BookingDetails

  it('should return the default state', () => {
    const action = { type: 'Unknown' } as any;
    const state = reducer(undefined, action);
    expect(state).toEqual(bookingInitialState);
  });

  it('should set bookingVariant on setBookingVariant action', () => {
    const action = BookingActions.setBookingVariant({ payload: dummyVariant });
    const state: BookingState = reducer(bookingInitialState, action);
    expect(state.bookingVariant).toEqual(dummyVariant);
  });

  it('should clear bookingVariant on clearBookingVariant action', () => {
    const preloadedState: BookingState = {
      ...bookingInitialState,
      bookingVariant: dummyVariant,
    };
    const action = BookingActions.clearBookingVariant();
    const state: BookingState = reducer(preloadedState, action);
    expect(state.bookingVariant).toBeNull();
  });

  it('should set bookingDetails on setBookingDetails action', () => {
    const action = BookingActions.setBookingDetails({ payload: dummyDetails });
    const state: BookingState = reducer(bookingInitialState, action);
    expect(state.bookingDetails).toEqual(dummyDetails);
  });

  it('should clear bookingDetails on clearBookingDetails action', () => {
    const preloadedState: BookingState = {
      ...bookingInitialState,
      bookingDetails: dummyDetails,
    };
    const action = BookingActions.clearBookingDetails();
    const state: BookingState = reducer(preloadedState, action);
    expect(state.bookingDetails).toBeNull();
  });
});
