import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../services/crud.service";
import {EmployeeDto} from "../dto/employee-dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<EmployeeDto> {
  constructor(http: HttpClient) {
    super(http, 'employee');
  }
}
