import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomNameFromNumber',
})
export class RoomNameFromNumberPipe implements PipeTransform {
  transform(count: number, type: string | RoomType): string {
    const forms = NUMERAL_TYPES_FORMS[type as RoomType] ?? null;

    return forms 
      ? count > 1 
        ? `${count} ${forms}s` : `${count} ${forms}`
      : `${count}`;
  }
}

export enum RoomType {
  Guest = 'guest',
  Bedroom = 'bedroom',
  Bathroom = 'bathroom',
  Bed = 'bed',
  Currency = 'dollar',
  Night = 'night',
}

export const NUMERAL_TYPES_FORMS: Record<RoomType, string> = {
  [RoomType.Guest]: 'guest',
  [RoomType.Bedroom]: 'bedroom',
  [RoomType.Bathroom]: 'bathroom',
  [RoomType.Bed]: 'bed',
  [RoomType.Currency]: 'dollar',
  [RoomType.Night]: 'night',
};