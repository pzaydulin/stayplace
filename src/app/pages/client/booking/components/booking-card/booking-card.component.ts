import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';
import { BookingService } from '../../data-access/booking.service';
import { CommonModule } from '@angular/common';
import { BookingVariantImagesPipe } from "../../pipes/booking-variant-images.pipe";
import { GalleriaModule } from 'primeng/galleria';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationService } from '@app/data-access/navigation.service';
import { NavigationPath } from '@app/models/navigation.interface';

@Component({
  selector: 'app-booking-card',
  imports: [CommonModule, GalleriaModule, BookingVariantImagesPipe],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent {
  private readonly bookingService: BookingService = inject(BookingService);
  protected bookingVariant = toSignal(this.bookingService.bookingVariant$);

  private readonly navigationService = inject(NavigationService);

  // сбросить index изображений удалось только таким образом
  // linkedSignal -> effect -> setTimeout

  imgActiveIndex = linkedSignal({
    source: this.bookingVariant,
    computation: () => -1,
  });

  eff = effect(() => {
    if (this.imgActiveIndex() === -1) {
      setTimeout(() => {
        this.imgActiveIndex.set(0);
      }, 0);
    }
  });

  onSelected(bookingVariant: BookingVariant, event: Event): void {
    const target = event.target as HTMLElement;

    // prevent navigate if pressed galleria's arrows
    const allowedTags = new Set(['BUTTON', 'svg', 'path']);

    if (allowedTags.has(target.tagName)) {
      return;
    }

    if (bookingVariant.firstRoom?.id) {
      console.log(
        'Booking card variant clicked:',
        bookingVariant,
        bookingVariant?.firstRoom?.id
      );
      this.navigationService.navigateByUrl(NavigationPath.RoomPage, {
        id: bookingVariant.firstRoom.id,
      });
    }
  }
}
