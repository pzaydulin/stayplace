import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavigationPath } from '@app/models/navigation.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router: Router = inject(Router);

  getRoute(
    navigationPath: NavigationPath,
    params: Record<string, any> = {}
  ): (string | number)[] {
    const segments = navigationPath.split('/').filter((value) => value?.length);
    const routeWithParams: (string | number)[] = ['/'];

    for (const segment of segments) {
      if (segment.charAt(0) === ':') {
        const paramName = segment.slice(1);
        if (params && params[paramName]) {
          routeWithParams.push(params[paramName]);
        } else {
          routeWithParams.push(paramName);
        }
      } else {
        routeWithParams.push(segment);
      }
    }

    return routeWithParams;
  }

  navigate(
    navigationPath: (string | number)[],
    extras?: NavigationExtras
  ): Promise<boolean> {
    return this.router.navigate(navigationPath, extras);
  }

  navigateByUrl(
    navigationPath: NavigationPath,
    params?: Record<string, any>,
    extras?: NavigationExtras
  ): Promise<boolean> {
    return this.navigate(this.getRoute(navigationPath, params), extras);
  }
}
