import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  private breakpoint$ =  this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .pipe(
          map((result) => result.matches)
        )

  public breakpoint = toSignal(this.breakpoint$, { initialValue: false });
}
