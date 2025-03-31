import { BookingVariant, BookingDetails } from "@app/models/booking.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Set Booking Variant': props<{ payload: BookingVariant }>(),
    'Clear Booking Variant': emptyProps(),
    'Set Booking Details': props<{ payload: BookingDetails }>(),
    'Clear Booking Details': emptyProps(),
  },
});
