import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { catchError, map, Observable, Observer, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private document = inject(DOCUMENT);
  private readonly googleMapKey = environment.googleMapsKey;
  private loaded = false;

  loadGoogleMapsAPI(): Observable<boolean> {
    return !this.loaded
      ? new Observable((observer: Observer<void>) => {
          const script = this.document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapKey}&loading=async&callback=initMap`;
          script.async = true;
          script.defer = true;

          (window as any).initMap = () => {
            observer.next();
            observer.complete();
          };

          script.onerror = (error) => {
            observer.error(error);
          };

          this.document.head.appendChild(script);
        }).pipe(
          tap(() => (this.loaded = true)),
          map(() => true),
          catchError((error) => {
            console.log('error:', error);
            return of(false);
          })
        )
      : of(this.loaded);
  }
}
