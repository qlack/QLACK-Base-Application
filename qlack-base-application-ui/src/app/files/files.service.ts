import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../app.constants";
import {CrudService} from "../services/crud.service";
import {FileDto} from "./dto/file-dto";

@Injectable({
  providedIn: "root"
})
export class FilesService extends CrudService<FileDto> {
  constructor(http: HttpClient) {
    super(http, "files");
  }

  download(id: string) {
    this.http.get(`${AppConstants.API_ROOT}/${this.getEndpoint()}/${id}/download`, {
      responseType: "blob", observe: "response"
    }).subscribe(onNext => {
      this.saveAs(onNext);
    });
  }
}
