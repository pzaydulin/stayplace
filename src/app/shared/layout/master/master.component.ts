import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-master',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './master.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterComponent {}
