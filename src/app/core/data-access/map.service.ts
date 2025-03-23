import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly googleMapKey: string = environment.googleMapsKey;
  private loaded = false;

  load(): Observable<boolean> {
    return !this.loaded
      ? this.httpClient
          .jsonp(
            `https://maps.googleapis.com/maps/api/js?key=${this.googleMapKey}`,
            'callback'
          )
          .pipe(
            tap(() => (this.loaded = true)),
            map(() => true),
            catchError(() => of(false))
          )
      : of(this.loaded);
  }
}
