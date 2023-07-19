import { Injectable } from "@angular/core";
import {CrudService} from "../services/crud.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../app.constants";
import {QPageableReply} from "@qlack/forms";
import {EmployeeDto} from "../employee/dto/employee-dto";

@Injectable({
  providedIn: "root"
})
export class SensitiveService extends CrudService<EmployeeDto> {

  constructor(http: HttpClient) {
    super(http, "sensitive");
  }

  getUnfiltered(id: any): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${AppConstants.API_ROOT}/${this.getEndpoint()}/${id}/nofilter`);
  }

  getAllUnfiltered(): Observable<QPageableReply<EmployeeDto>> {
    return this.http.get<QPageableReply<EmployeeDto>>(`${AppConstants.API_ROOT}/${this.getEndpoint()}/nofilter`);
  }
}
