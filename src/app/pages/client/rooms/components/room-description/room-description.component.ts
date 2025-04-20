import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoomExtended } from '../../data-access/room-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-description',
  imports: [CommonModule],
  styleUrls: ['./room-description.component.scss'],
  templateUrl: './room-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDescriptionComponent {
  readonly room = input.required<RoomExtended>();

  isExpanded: boolean = false;

  // htmlContent: SafeHtml;

  // constructor(private sanitizer: DomSanitizer) {
  //   const rawHtml = '<b>Привет, мир!</b> Это пример текста с HTML.';
  //   this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  // }
}
