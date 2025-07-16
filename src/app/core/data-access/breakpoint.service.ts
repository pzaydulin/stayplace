import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  public breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((result) => result.matches));

  // Нельзя использовать toSignal в глобольном сервисе т.к. не отписывается автоматически
  // и может привести к утечке памяти. toSignal это альтернатива AsyncPipe и должен использоваться в компонентах.
  // public breakpoint = toSignal(this.breakpoint$, { initialValue: false }); // wrong usage
}
