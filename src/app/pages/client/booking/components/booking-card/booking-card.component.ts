import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';
import { Observable } from 'rxjs';
import { BookingService } from '../../data-access/booking.service';
import { CommonModule } from '@angular/common';
import { BookingVariantImagesPipe } from "../../pipes/booking-variant-images.pipe";
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, GalleriaModule, BookingVariantImagesPipe],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent implements OnInit {
  bookingVariant$!: Observable<BookingVariant>;

  constructor(private readonly bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingVariant$ = this.bookingService.bookingVariant$;
  }

  onSelected(bookingVariant: BookingVariant): void {
    if (bookingVariant.firstRoom?.id) {
      console.log('Booking card variant clicked:', bookingVariant?.firstRoom?.id);
  //     this.navigationService.navigateByUrl(NavigationPath.RoomPage, { id: bookingVariant.firstRoom.id });
    }
  }

  
}
