import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private endpoint = "http";

  constructor(private http: HttpClient) {
  }

  longRequestPB(): Observable<boolean> {
    return this.http.get<boolean>(`${AppConstants.API_ROOT}/${this.endpoint}`);
  }

  longRequest(): Observable<boolean> {
    return this.http.get<boolean>(`${AppConstants.API_ROOT}/${this.endpoint}`,
      {headers: new HttpHeaders({'ignoreProgressBar': ''})});
  }
}
