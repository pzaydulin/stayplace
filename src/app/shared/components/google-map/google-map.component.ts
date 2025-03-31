import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';

import { MapMarkerConfig } from '@app/models/map.interface';
import { GoogleMapsService } from '@app/data-access/map.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-map',
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  @Input() options!: google.maps.MapOptions;
  @Input() markers: MapMarkerConfig[] = [];

  @Output() mapMarkerClicked = new EventEmitter<MapMarkerConfig>();
  @Output() mapInfoWindowClosed = new EventEmitter<void>();

  protected apiLoaded$!: Observable<boolean>;

  private markerClicked: MapMarkerConfig | null = null;

  constructor(private readonly googleMapsService: GoogleMapsService) {}

  ngOnInit(): void {
    this.apiLoaded$ = this.googleMapsService.loadGoogleMapsAPI();
  }

  onMarkerClick(config: MapMarkerConfig, marker: MapAdvancedMarker): void {
    this.markerClicked = config;
    this.mapMarkerClicked.emit(config);
    this.infoWindow?.open(marker);
  }

  onMapClick(): void {
    if (this.markerClicked) {
      this.closeInfoWindow();
    }
  }

  onInfoWindowClosed(): void {
    this.closeInfoWindow();
  }

  private closeInfoWindow(): void {
    this.markerClicked = null;
    this.infoWindow?.close();
    this.mapInfoWindowClosed.emit();
  }
}