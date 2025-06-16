// import { BOOKING_VARIANT_STUB, BOOKING_DETAILS_STUB } from "@app/test/stubs/booking.stub";
// import { BookingState, BOOKING_FEATURE_KEY, bookingInitialState } from "./booking.reducer";

// describe('Booking Selectors', () => {
//   const getState = (payload: Partial<BookingState>): BookingPartialState =>
//     createStore(BOOKING_FEATURE_KEY, bookingInitialState, payload);

//   it('selectBookingVariant() should return bookingVariant', () => {
//     const state = getState({ bookingVariant: BOOKING_VARIANT_STUB });
//     const results = BookingSelectors.selectBookingVariant(state);

//     expect(results).toEqual(BOOKING_VARIANT_STUB);
//   });

//   it('selectBookingDetails() should return bookingDetails', () => {
//     const state = getState({ bookingDetails: BOOKING_DETAILS_STUB });
//     const results = BookingSelectors.selectBookingDetails(state);

//     expect(results).toEqual(BOOKING_DETAILS_STUB);
//   });
// });

import {
  selectBookingState,
  selectBookingVariant,
  selectBookingDetails,
} from './booking.selectors';
import {
  BookingState,
  BOOKING_FEATURE_KEY,
} from './booking.reducer';
import { BOOKING_VARIANT_STUB, BOOKING_DETAILS_STUB } from '@app/test/stubs/booking.stub';

describe('[core/store] Booking Selectors', () => {
  const state = {
    [BOOKING_FEATURE_KEY]: {
      bookingVariant: BOOKING_VARIANT_STUB,
      bookingDetails: BOOKING_DETAILS_STUB,
    } as BookingState,
  };

  it('selectBookingState  should return state bookings', () => {
    const result = selectBookingState(state);
    expect(result).toEqual(state[BOOKING_FEATURE_KEY]);
  });

  it('selectBookingVariant should return bookingVariant from the state', () => {
    const result = selectBookingVariant(state);
    expect(result).toEqual(BOOKING_VARIANT_STUB);
  });

  it('selectBookingDetails should return bookingDetails from the state', () => {
    const result = selectBookingDetails(state);
    expect(result).toEqual(BOOKING_DETAILS_STUB);
  });
});