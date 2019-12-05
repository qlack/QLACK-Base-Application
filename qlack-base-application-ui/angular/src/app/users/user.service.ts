import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {LoginInfoDto} from '../dto/login-info-dto';
import {UserDto} from '../dto/user-dto';
import {CrudService} from '../services/crud.service';
import {QFormsService} from '@eurodyn/forms';
import {FormGroup} from '@angular/forms';

/**
 * A service providing functionality for the user of the application, including authentication,
 * authorisation and session management.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDto> {
  private resource = `users`;

  constructor(http: HttpClient, private jwtService: JwtHelperService, qForms: QFormsService) {
    super(http, 'users', qForms);
  }

  // Returns the JWT.
  private static getJwt(): string {
    return localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
  }

  // Authenticate a user.
  login(loginInfoDTO: LoginInfoDto): Observable<string> {
    return this.http.post<string>(AppConstants.API_ROOT + `/${this.resource}/auth`,
      JSON.stringify(loginInfoDTO),
      {headers: {'Content-Type': 'application/json'}});
  }

  // Return a claim from JWT.
  getJWTClaim(claim: string): string {
    let claimValue: string;

    if (UserService.getJwt()) {
      claimValue = this.jwtService.decodeToken(UserService.getJwt())[claim];
    }

    return claimValue;
  }

  // Logs out the user terminating its session.
  logout(): Observable<any> {
    return this.http.get(AppConstants.API_ROOT + `/${this.resource}/logout`);
  }

  // Save user
  save(user: UserDto) {
    return this.http.post(AppConstants.API_SECURED_ROOT + `/${this.resource}`, JSON.stringify(user),
      {headers: {'Content-Type': 'application/json'}});
  }

  upload(form: FormGroup) {
    return this.qForms.uploadForm(this.http, form,
      `${AppConstants.API_SECURED_ROOT}/${this.resource}/upload`, false);
  }

}
