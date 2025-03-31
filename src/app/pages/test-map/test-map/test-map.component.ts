import { Component, OnInit } from "@angular/core";
import { GoogleMapsService } from "../test-map.service";
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, CommonModule],
  template: `
    <h1>Google Maps in Angular 18</h1>
    <google-map
      height="600px"
      width="800px"
      *ngIf="apiLoaded$ | async"
      [options]="options"
    ></google-map>
  `,
  styles: [
    `
      #map {
        height: 400px;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  constructor(private googleMapsService: GoogleMapsService) {}

  options: google.maps.MapOptions = {
    center: {
      lat: 59.93839227045331,
      lng: 30.360033589998572,
    },
    zoom: 14,
  };

  apiLoaded$!: Observable<boolean>;

  ngOnInit(): void {
    this.apiLoaded$ = this.googleMapsService.loadGoogleMapsAPI();

  }
}
