import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingMapComponent } from './components/booking-map/booking-map.component';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { ButtonModule } from 'primeng/button';
import { BookingBoxComponent } from './components/booking-box/booking-box.component';
import { BreakpointService } from '@app/data-access/breakpoint.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-booking',
  imports: [
    CommonModule,
    BookingListComponent,
    BookingMapComponent,
    BookingCardComponent,
    ButtonModule,
    BookingBoxComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private breakpointService = inject(BreakpointService);
  protected isMobileScreen = toSignal(this.breakpointService.breakpoint$, {
    initialValue: false,
  });

  protected isMapShown = true;
}
