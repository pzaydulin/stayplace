import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BookingVariantFirstImagePipe } from "../../pipes/booking-variant-first-image.pipe";
import { BackgroundImagePipe } from "../../../../../shared/pipes/background-image.pipe";
import { Observable } from 'rxjs';
import { BookingVariant } from '@app/models/booking.interface';
import { BookingService } from '../../data-access/booking.service';
import { CommonModule } from '@angular/common';
import { NavigationService } from '@app/data-access/navigation.service';
import { NavigationPath } from '@app/models/navigation.interface';

@Component({
  selector: 'app-booking-box',
  imports: [CommonModule, BookingVariantFirstImagePipe, BackgroundImagePipe],
  templateUrl: './booking-box.component.html',
  styleUrl: './booking-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingBoxComponent implements OnInit {
  bookingVariant$!: Observable<BookingVariant>;

  private readonly bookingService: BookingService = inject(BookingService);
  private readonly navigationService: NavigationService = inject(NavigationService);

  ngOnInit(): void {
    this.bookingVariant$ = this.bookingService.bookingVariant$;
  }

  onClick(bookingVariant: BookingVariant): void {
    if (bookingVariant.firstRoom?.id) {
      console.log('Booking variant clicked:', bookingVariant.firstRoom.id);
      void this.navigationService.navigateByUrl(NavigationPath.RoomPage, {
        id: bookingVariant.firstRoom?.id,
      });
    }
  }
}
