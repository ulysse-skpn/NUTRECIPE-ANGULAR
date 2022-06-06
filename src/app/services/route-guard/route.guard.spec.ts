import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RootService } from '../root-service/root.service';
import { RouteGuard } from './route.guard';
import { Router } from '@angular/router';

describe('RouteGuardServiceGuard', () => {
  let routeGuard: RouteGuard
  let routeMock: any = { snapshot: {}}
  let routeStateMock: any = { snapshot: {}, url: '/login'}

  const rootServiceSpy = jasmine.createSpyObj("RootService",
  ['isLoggedIn'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [ RouteGuard , 
      {
        provide: Router , useValue: routeMock
      },
      {
        provide: RootService , userValue: rootServiceSpy
      }
    ]
    })

    routeGuard = TestBed.inject(RouteGuard)
  });

  it('Route guard service should be created', () => {
    expect(routeGuard).toBeTruthy();
  });

  // it('should allow the authenticated user to access protected routes', () => {
  //   rootServiceSpy.isLoggedIn.and.returnValue(true)
  //   expect(routeGuard.canActivate(routeMock, routeStateMock)).toEqual(true)
  // });
});
