import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginInfoDto} from '../dto/login-info-dto';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(http: HttpClient, private localHttp: HttpClient) {}


  login(loginInfoDTO: LoginInfoDto) {
    return this.localHttp.post(AppConstants.API_ROOT + '/login', JSON.stringify(loginInfoDTO), {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    });
  }
}
