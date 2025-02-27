import {Injectable} from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class JwtHelperService {

  isTokenExpired(jwtString: string) {
    // Get the token expiration date.
    const token = JSON.parse(atob(jwtString.split(".")[1]));
    const expirationDate = new Date(token.exp * 1000);

    // Check if the token has expired.
    return expirationDate < new Date();
  }
}
