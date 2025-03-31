import { inject, Injectable } from '@angular/core';
import { BookingVariant, BookingDetails } from '@app/models/booking.interface';
import { Building } from '@app/models/building.interface';
import { MapMarkerConfig } from '@app/models/map.interface';
import { Room } from '@app/models/room.interface';
import { BookingFacade } from '@app/store/booking.facade';
import { BuildingFacade } from '@app/store/building.facade';
import { RoomFacade } from '@app/store/room.facade';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * a service that connects RoomFacade and BuildingFacade and uses  
 * to get an up-to-date list of variants.
 */
export function getFirstRoomOnBuilding(building: Building, rooms: Room[]): Room | null {
  const firstRoomId = building.rooms.length ? building.rooms[0] : null;

  return firstRoomId ? rooms.find((room) => room.id === firstRoomId) ?? null : null;
}

function createNodeFromString(content: string): Node {
  const priceTag = document.createElement('div');
  priceTag.innerHTML = content;
  priceTag.className = 'price-tag';
  return priceTag;
}

/**
* This function casts booking variants to map marker configs
* It filters out booking variants without rooms and maps them to the required format
*/
export function castMapMarkerConfigs(bookingVariants: BookingVariant[]): MapMarkerConfig[] {

  return bookingVariants
    .filter((bookingVariant) => bookingVariant.rooms.length)
    .map((bookingVariant) => ({
      position: {
        lat: bookingVariant.lat,
        lng: bookingVariant.lng,
      },
      content: createNodeFromString(
        bookingVariant.firstRoom?.price.toString() ?? ''
      ),
      data: bookingVariant,
    }));
}

@Injectable({
  providedIn: 'root',
})
/**
 * BookingService is a service that connects RoomFacade and BuildingFacade and uses  
 * to get an up-to-date list of variants.
 * It also provides methods to set and clear booking variants and details.
 */
export class BookingService {
  private readonly buildingFacade: BuildingFacade = inject(BuildingFacade);
  private readonly roomFacade: RoomFacade = inject(RoomFacade);
  private readonly bookingFacade: BookingFacade = inject(BookingFacade);
  
  bookingVariant$: Observable<BookingVariant> =
    this.bookingFacade.bookingVariant$.pipe(filter<any>(Boolean));

  bookingVariants$: Observable<BookingVariant[]> = combineLatest([
    this.buildingFacade.buildings$.pipe(filter<any>(Boolean)),
    this.roomFacade.rooms$.pipe(filter<any>(Boolean)),
  ]).pipe(
    map(([buildings, rooms]: [Building[], Room[]]) =>
      buildings
        .filter((building) => building.rooms.length)
        .map((building) => ({
          ...building,
          firstRoom: getFirstRoomOnBuilding(building, rooms),
        }))
    )
  );

  bookingDetails$: Observable<BookingDetails> =
    this.bookingFacade.bookingDetails$.pipe(filter<any>(Boolean));

  mapMarkers$: Observable<MapMarkerConfig[]> = this.bookingVariants$.pipe(
    map(castMapMarkerConfigs)
  );

  setBookingVariant(bookingVariant: BookingVariant): void {
    this.bookingFacade.setBookingVariant(bookingVariant);
  }

  setBookingDetails(bookingDetails: BookingDetails): void {
    this.bookingFacade.setBookingDetails(bookingDetails);
  }

  clearBookingVariant(): void {
    this.bookingFacade.clearBookingVariant();
  }

  clearBookingDetails(): void {
    this.bookingFacade.clearBookingDetails();
  }
}