import { inject, Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import { BookingDetails, BookingVariant } from '@app/models/booking.interface';

import { BookingActions } from './booking.actions';
import { BookingState } from './booking.reducer';
import * as BookingSelectors from './booking.selectors';

@Injectable({
  providedIn: 'root',
})
export class BookingFacade {
  private readonly store: Store<BookingState> = inject(Store);

  bookingVariant$ = this.store.select(BookingSelectors.selectBookingVariant);
  bookingDetails$ = this.store.select(BookingSelectors.selectBookingDetails);
  setBookingVariant(payload: BookingVariant): void {
    this.dispatch(BookingActions.setBookingVariant({ payload }));
  }

  setBookingDetails(payload: BookingDetails): void {
    this.dispatch(BookingActions.setBookingDetails({ payload }));
  }

  clearBookingVariant(): void {
    this.dispatch(BookingActions.clearBookingVariant());
  }

  clearBookingDetails(): void {
    this.dispatch(BookingActions.clearBookingDetails());
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
