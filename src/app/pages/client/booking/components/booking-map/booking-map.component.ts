import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookingVariant } from '@app/models/booking.interface';
import { MapMarkerConfig } from '@app/models/map.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from '@app/shared/components/google-map/google-map.component';
import { BookingService } from '@app/pages/client/booking/data-access/booking.service';

@Component({
  selector: 'app-booking-map',
  imports: [CommonModule, GoogleMapComponent],
  templateUrl: './booking-map.component.html',
  styleUrl: './booking-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingMapComponent {
  options: google.maps.MapOptions = {
    center: {
      lat: 47.616660,
      lng: -122.058448,
    },
    zoom: 14,
    mapId: 'DEMO_MAP_ID',
  };

  mapMarkers$!: Observable<MapMarkerConfig[]>;

  constructor(private readonly bookingService: BookingService) {}

  ngOnInit(): void {
    this.mapMarkers$ = this.bookingService.mapMarkers$;
  }

  onMapMarkerClicked(markerConfig: MapMarkerConfig<BookingVariant>): void {
    this.bookingService.setBookingVariant(markerConfig.data);
  }

  onMapInfoWindowClosed(): void {
    this.bookingService.clearBookingVariant();
  }
}
