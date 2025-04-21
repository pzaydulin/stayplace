import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RoomPreviewImagesPipe } from '../../pipes/room-preview-images.pipe';
import { BackgroundImagePipe } from '@app/shared/pipes/background-image.pipe';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-room-photo',
  imports: [
    CommonModule,
    ButtonModule,
    RoomPreviewImagesPipe,
    BackgroundImagePipe,
    CarouselModule,
  ],
  templateUrl: './room-photo.component.html',
  styleUrl: './room-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomPhotoComponent {
  photos = input<string[]>([]);
  isMobileScreen = input<boolean>(false);
  
  onShowAll() {}
}
