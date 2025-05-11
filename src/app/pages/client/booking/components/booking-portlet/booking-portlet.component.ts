import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';
import { GalleriaModule } from 'primeng/galleria';
import { BookingVariantImagesPipe } from '../../pipes/booking-variant-images.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@app/data-access/navigation.service';
import { NavigationPath } from '@app/models/navigation.interface';
import { NavPathPipe } from '@app/shared/pipes/nav-path.pipe';

@Component({
  selector: 'app-booking-portlet',
  imports: [
    CommonModule, 
    RouterModule,
    GalleriaModule, 
    BookingVariantImagesPipe, 
    CardModule, 
    ButtonModule,
    NavPathPipe
  ],
  templateUrl: './booking-portlet.component.html',
  styleUrl: './booking-portlet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPortletComponent {
  public bookingVariant = input.required<BookingVariant>();

  NavigationPath = NavigationPath;

  private readonly navigationService: NavigationService = inject(NavigationService);

  onSelected(): void {
    // if (this.bookingVariant?.firstRoom?.id) {
    //   void this.navigationService.navigate(NavigationPath.RoomPage, {
    //     id: this.bookingVariant.firstRoom?.id,
    //   });
    // }
  }
}
