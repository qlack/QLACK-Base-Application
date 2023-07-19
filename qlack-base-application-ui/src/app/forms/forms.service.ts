import {Injectable} from "@angular/core";
import {CrudService} from "../services/crud.service";
import {HttpClient} from "@angular/common/http";
import {FormDto} from "./dto/form-dto";

@Injectable({
  providedIn: "root"
})
export class FormsService extends CrudService<FormDto> {
  constructor(http: HttpClient) {
    super(http, "forms");
  }
}
