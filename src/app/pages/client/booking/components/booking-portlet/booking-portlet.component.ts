import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';
import { GalleriaModule } from 'primeng/galleria';
import { BookingVariantImagesPipe } from '../../pipes/booking-variant-images.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-booking-portlet',
  imports: [CommonModule, GalleriaModule, BookingVariantImagesPipe, CardModule, ButtonModule],
  templateUrl: './booking-portlet.component.html',
  styleUrl: './booking-portlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPortletComponent {
  public bookingVariant = input.required<BookingVariant>();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  // NavigationPath = NavigationPath;

  // constructor(private readonly navigationService: NavigationService) {}

  onSelected(): void {
    // if (this.bookingVariant?.firstRoom?.id) {
    //   void this.navigationService.navigate(NavigationPath.RoomPage, {
    //     id: this.bookingVariant.firstRoom?.id,
    //   });
    // }
  }
}
