import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingListComponent } from "./components/booking-list/booking-list.component";
import { BookingMapComponent } from "./components/booking-map/booking-map.component";
import { BookingCardComponent } from "./components/booking-card/booking-card.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-booking',
  imports: [
    CommonModule,
    BookingListComponent,
    BookingMapComponent,
    BookingCardComponent,
    ButtonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);

  private readonly destroyRef = inject(DestroyRef);

  protected isMobileScreen = signal(false);
  protected isMapShown = true;
  ngOnInit(): void {
    // Observe the screen size and set isMobileScreen accordingly
    // This will set isMobileScreen to true if the screen size is less than or equal to 600px
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.isMobileScreen.set(result.matches);
      });
  }
}
