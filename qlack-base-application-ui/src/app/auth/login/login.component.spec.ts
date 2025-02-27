import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Renderer2, Type} from '@angular/core';
import {of, throwError} from 'rxjs';
import {LoginComponent} from './login.component';
import {AuthService} from '../auth.service';
import {UtilityService} from '../../shared/service/utility.service';
import {JwtTrackerService} from '../../shared/service/jwt-tracker.service';
import {AppConstants} from '../../app.constants';
import {LoginInfoDto} from '../dto/login-info-dto';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jasmine.SpyObj<AuthService>;
    let utilityService: jasmine.SpyObj<UtilityService>;
    let router: jasmine.SpyObj<Router>;
    let renderer: Renderer2;
    let jwtTrackerService: jasmine.SpyObj<JwtTrackerService>;

    beforeEach(async () => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
      const utilityServiceSpy = jasmine.createSpyObj('UtilityService', ['popupError']);
      const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      const jwtTrackerServiceSpy = jasmine.createSpyObj('JwtTrackerService', ['startTracking']);

      await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [ReactiveFormsModule],
    providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UtilityService, useValue: utilityServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: JwtTrackerService, useValue: jwtTrackerServiceSpy }
    ]
})
      .compileComponents();

      authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
      utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      jwtTrackerService = TestBed.inject(JwtTrackerService) as jasmine.SpyObj<JwtTrackerService>;
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set background image if not logged in', () => {
        spyOn(component, 'isLoggedIn').and.returnValue(false);
        spyOn(renderer, 'setAttribute').and.callThrough();

        component.ngOnInit();

        expect(renderer.setAttribute).toHaveBeenCalledWith(document.body, 'style', jasmine.any(String));
      });

      it('should navigate to home if logged in', () => {
        spyOn(component, 'isLoggedIn').and.returnValue(true);

        component.ngOnInit();

        expect(router.navigate).toHaveBeenCalledWith(['home']);
      });

      it('should login and navigate to home on successful login', () => {
        const mockLoginInfo: LoginInfoDto = { email: 'test@example.com', password: 'password' };
        const mockResponse = { jwt: 'mock-jwt-token' };
        authService.login.and.returnValue(of(mockResponse));
        spyOn(renderer, 'removeAttribute').and.callThrough();
        spyOn(localStorage, 'setItem');
        component.loginForm.setValue(mockLoginInfo);
        component.onSubmit({ value: mockLoginInfo });

        expect(authService.login).toHaveBeenCalledWith(mockLoginInfo);
        expect(localStorage.setItem).toHaveBeenCalledWith(AppConstants.JWT_STORAGE_NAME, mockResponse.jwt);
        expect(jwtTrackerService.startTracking).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['home']);
        expect(renderer.removeAttribute).toHaveBeenCalledWith(document.body, 'style');
      });

      it('should show error message on failed login', () => {
        const mockLoginInfo: LoginInfoDto = { email: 'test@example.com', password: 'password' };
        authService.login.and.returnValue(throwError('error'));

        component.loginForm.setValue(mockLoginInfo);
        component.onSubmit({ value: mockLoginInfo });

        expect(authService.login).toHaveBeenCalledWith(mockLoginInfo);
        expect(utilityService.popupError).toHaveBeenCalledWith('Authentication was unsuccessful.');
        expect(component.errorMessage).toBe('Authentication was unsuccessful.');
        expect(component.hideLoginForm).toBeFalse();
      });
  });
