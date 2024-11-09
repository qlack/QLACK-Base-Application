import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConstants } from '../app.constants';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let jwtHelperServiceMock: any;

  beforeEach(() => {
    jwtHelperServiceMock = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: JwtHelperService, useValue: jwtHelperServiceMock }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should call logout and return success', () => {
    authService.logout().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${AppConstants.API_ROOT}/users/logout`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call logout and handle error', () => {
    authService.logout().subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${AppConstants.API_ROOT}/users/logout`);
    expect(req.request.method).toBe('GET');
    req.flush('Logout failed', { status: 500, statusText: 'Server Error' });
  });
});