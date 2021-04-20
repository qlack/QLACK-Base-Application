import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {AppConstants} from '../app.constants';
import {LoginInfoDto} from '../dto/login-info-dto';
import {UserDto} from '../dto/user-dto';
import {CrudService} from '../services/crud.service';
import {JwtDto} from '../dto/jwt-dto';

/**
 * A service providing functionality for the user of the application, including authentication,
 * authorisation and session management.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService extends CrudService<UserDto> {
  private resource = `users`;

  constructor(http: HttpClient, private jwtService: JwtHelperService) {
    super(http, 'users');
  }

  // Returns the JWT.
  private static getJwt(): string | null {
    return localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
  }

  // Authenticate a user.
  login(loginInfoDTO: LoginInfoDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(AppConstants.API_ROOT + `/${this.resource}/auth`,
      JSON.stringify(loginInfoDTO),
      {headers: {'Content-Type': 'application/json'}});
  }

  // Return a claim from JWT.
  getJWTClaim(claim: string): string | null {
    if (AuthService.getJwt()) {
      // @ts-ignore
      return this.jwtService.decodeToken(AuthService.getJwt())[claim];
    } else {
      return null;
    }
  }

  // Logs out the user terminating its session.
  logout(): Observable<any> {
    return this.http.get(AppConstants.API_ROOT + `/${this.resource}/logout`);
  }

  // Save user
  save(user: UserDto) {
    return this.http.post(AppConstants.API_ROOT + `/${this.resource}`, JSON.stringify(user),
      {headers: {'Content-Type': 'application/json'}});
  }

}
