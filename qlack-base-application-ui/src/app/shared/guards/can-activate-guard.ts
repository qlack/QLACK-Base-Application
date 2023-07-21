import {inject, Injectable} from "@angular/core";
import {Log} from "ng2-logger/browser";
import {AppConstants} from "../../app.constants";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
class GuardService {
  log = Log.create("GuardService");

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const jwtString = localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
    if (jwtString) {
      return true;
    } else {
      const redirect = window.location.href;
      this.log.info(`Did not find a JWT. Proceeding to login with a redirect back to ${redirect}.`);
      this.router.navigate(["login", {redirect: redirect}]);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean => {
  return inject(GuardService).canActivate();
}
