import { inject, Pipe, PipeTransform } from '@angular/core';
import { NavigationService } from '@app/data-access/navigation.service';
import { NavigationPath } from '@app/models/navigation.interface';

@Pipe({
  name: 'navPath'
})
export class NavPathPipe implements PipeTransform {

  private readonly navigationService: NavigationService = inject(NavigationService);

  transform(path: NavigationPath, params?: Record<string, string | number | undefined>): (string | number)[] {
    return this.navigationService.getRoute(path, params);
  }

}
