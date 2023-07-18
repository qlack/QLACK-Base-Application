import {AppConstants} from "../app.constants";
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UntypedFormGroup} from "@angular/forms";
import {QPageableReply} from "@qlack/forms";
import * as fs from "file-saver";

/**
 * A convenience CRUD service to be extended by concrete services to provide default CRUD methods.
 */
export class CrudService<T> {
  constructor(public http: HttpClient, private endpoint: string) {
  }

  save(object: T) {
    return this.http.post(`${AppConstants.API_ROOT}/${this.endpoint}`, object);
  }

  getAll(queryString?: string): Observable<QPageableReply<T>> {
    if (queryString) {
      return this.http.get<QPageableReply<T>>(
        `${AppConstants.API_ROOT}/${this.endpoint}?${queryString}`);
    } else {
      return this.http.get<QPageableReply<T>>(`${AppConstants.API_ROOT}/${this.endpoint}`);
    }
  }

  get(id: any): Observable<T> {
    return this.http.get<T>(`${AppConstants.API_ROOT}/${this.endpoint}/${id}`);
  }

  getAny(): Observable<T> {
    return this.http.get<T>(`${AppConstants.API_ROOT}/${this.endpoint}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${AppConstants.API_ROOT}/${this.endpoint}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${AppConstants.API_ROOT}/${this.endpoint}`);
  }

  upload(form: UntypedFormGroup, url?: string, reportProgress?: boolean): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    for (const formField in form.value) {
      formData.append(formField, form.value[formField]);
    }
    const req = new HttpRequest(
      "POST",
      url ? url : `${AppConstants.API_ROOT}/${this.endpoint}`,
      formData, {
        reportProgress: reportProgress,
      }
    );

    return this.http.request(req);
  }

  saveAs(onNext: HttpResponse<Blob>) {
    const blob = new Blob([onNext.body!], {type: "application/octet-stream"});
    const filename = onNext.headers.get("Content-Disposition")!.split(";")[1].split("=")[1];
    fs.saveAs(blob, filename);
  }

  getEndpoint() {
    return this.endpoint;
  }
}
