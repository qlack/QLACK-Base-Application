import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Log} from 'ng2-logger/browser';
import {BaseComponent} from '../component/base-component';

@Injectable()
export class CanActivateGuard extends BaseComponent implements CanActivate {
  // Logger.
  private log = Log.create('CanActivateGuard');

  constructor(private jwtService: JwtHelperService, private router: Router) {
    super();
  }

  // The default guard for all routes.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwtString = localStorage.getItem(this.constants.JWT_STORAGE_NAME);
    if (jwtString) {
      return true;
    } else {
      const redirect = window.location.href;
      this.log.info(`Did not find a JWT. Proceeding to login with a redirect back to ${redirect}.`);
      this.router.navigate(['login', {redirect: redirect}]);
      return false;
    }
  }

}
