import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingVariant, BookingDetails } from '@app/models/booking.interface';
import { BookingActions } from './booking.actions';

export const BOOKING_FEATURE_KEY = 'bookings';

export interface BookingState {
  bookingVariant: BookingVariant | null;
  bookingDetails: BookingDetails | null;
}

export const bookingInitialState: BookingState = {
  bookingVariant: null,
  bookingDetails: null,
};

export const reducer = createReducer(
  bookingInitialState,
  on(BookingActions.setBookingVariant, (state, { payload }) => ({
    ...state,
    bookingVariant: payload,
  })),
  on(BookingActions.clearBookingVariant, (state) => ({
    ...state,
    bookingVariant: null,
  })),
  on(BookingActions.setBookingDetails, (state, { payload }) => ({
    ...state,
    bookingDetails: payload,
  })),
  on(BookingActions.clearBookingDetails, (state) => ({
    ...state,
    bookingDetails: null,
  }))
);

export const BookingFeature = createFeature({
  name: BOOKING_FEATURE_KEY,
  reducer,
});
