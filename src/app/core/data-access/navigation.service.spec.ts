import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { Router, NavigationExtras } from '@angular/router';
import { NavigationPath } from '@app/models/navigation.interface';

describe('[core/data-access] NavigationService', () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spy for Router with navigate method
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [NavigationService, { provide: Router, useValue: spy }],
    });
    service = TestBed.inject(NavigationService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('getRoute', () => {
    it('should return route segments without parameters', () => {
      // Example the path without parameters, extra "/" will be removed
      const navigationPath = '/dashboard/home/' as NavigationPath;
      const route = service.getRoute(navigationPath);
      expect(route).toEqual(['/', 'dashboard', 'home']);
    });

    it('should replace parameter segment with provided value', () => {
      // the route with a parameter and a value for that parameter
      const navigationPath = '/user/:id/profile' as NavigationPath;
      const params = { id: 42 };
      const route = service.getRoute(navigationPath, params);
      // expect that the :id segment is replaced with the value 42
      expect(route).toEqual(['/', 'user', 42, 'profile']);
    });

    it('should use parameter name if value is not provided', () => {
      // if parameter is not provided, its name (without :) will be added to the route
      const navigationPath = '/user/:id/settings' as NavigationPath;
      const route = service.getRoute(navigationPath);
      expect(route).toEqual(['/', 'user', 'id', 'settings']);
    });
  });

  describe('navigate', () => {
    it('should call Router.navigate with provided route and extras', async () => {
      // Set up the spy to return a resolved Promise
      routerSpy.navigate.and.returnValue(Promise.resolve(true));
      const route: (string | number)[] = ['/', 'sample'];
      const extras: NavigationExtras = { replaceUrl: true };

      const result = await service.navigate(route, extras);
      expect(routerSpy.navigate).toHaveBeenCalledWith(route, extras);
      expect(result).toBeTrue();
    });
  });

  describe('navigateByUrl', () => {
    it('should call navigate with route formed by getRoute', async () => {
      routerSpy.navigate.and.returnValue(Promise.resolve(true));
      const navigationPath = '/product/:productId/details' as NavigationPath;
      const params = { productId: 7 };
      const extras: NavigationExtras = { skipLocationChange: true };

      const expectedRoute = service.getRoute(navigationPath, params);
      const result = await service.navigateByUrl(
        navigationPath,
        params,
        extras
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(expectedRoute, extras);
      expect(result).toBeTrue();
    });
  });
});
