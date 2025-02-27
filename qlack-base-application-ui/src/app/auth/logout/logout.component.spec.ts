import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Renderer2, Type} from '@angular/core';
import {of, throwError} from 'rxjs';
import {LogoutComponent} from './logout.component';
import {AuthService} from '../auth.service';
import {JwtTrackerService} from '../../shared/service/jwt-tracker.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let jwtTrackerService: jasmine.SpyObj<JwtTrackerService>;
  let renderer: Renderer2;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const jwtTrackerServiceSpy = jasmine.createSpyObj('JwtTrackerService', ['stopTracking']);

    await TestBed.configureTestingModule({
    declarations: [LogoutComponent],
    providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: JwtTrackerService, useValue: jwtTrackerServiceSpy }
    ]
}).compileComponents();

      authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
      jwtTrackerService = TestBed.inject(JwtTrackerService) as jasmine.SpyObj<JwtTrackerService>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    authService.logout.and.returnValue(of());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set background style on init', () => {
    spyOn(renderer, 'setAttribute').and.callThrough();
    component.ngOnInit();
    expect(renderer.setAttribute).toHaveBeenCalledWith(
      document.body,
      'style',
      'background-image:  linear-gradient(to top, rgba(0,0,0,0) 30%, rgba(255,255,255,0.62) 64%, rgba(255,255,255,1) 89%), url(/img/bg.jpg); background-size: cover;'
    );
  });

  it('should call logout and handle success', () => {
    authService.logout.and.returnValue(of({}));
    spyOn(localStorage, 'removeItem');

    component.ngOnInit();

    expect(authService.logout).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith(component.constants.JWT_STORAGE_NAME);
    expect(jwtTrackerService.stopTracking).toHaveBeenCalled();
  });

  it('should call logout and handle error', () => {
    authService.logout.and.returnValue(throwError(() => new Error('Logout failed')));
    spyOn(localStorage, 'removeItem');

    component.ngOnInit();

    expect(authService.logout).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith(component.constants.JWT_STORAGE_NAME);
    expect(jwtTrackerService.stopTracking).toHaveBeenCalled();
  });
});
