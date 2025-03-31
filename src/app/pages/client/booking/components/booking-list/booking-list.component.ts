import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookingService } from 'src/app/pages/client/booking/data-access/booking.service';
import { BookingVariant } from '@app/models/booking.interface';
import { Observable } from 'rxjs';
import { BookingPortletComponent } from '../booking-portlet/booking-portlet.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  imports: [BookingPortletComponent, CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingListComponent {
  private readonly bookingService: BookingService = inject(BookingService);
  bookingVariants$: Observable<BookingVariant[]> = this.bookingService.bookingVariants$;
}
