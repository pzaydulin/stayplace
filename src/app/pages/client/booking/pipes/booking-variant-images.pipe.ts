import { Pipe, PipeTransform } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';

@Pipe({
  name: 'bookingVariantImages',
})
export class BookingVariantImagesPipe implements PipeTransform {
  transform(bookingVariant: BookingVariant): string[] {
    return bookingVariant.firstRoom?.photos ?? [];
  }
}
