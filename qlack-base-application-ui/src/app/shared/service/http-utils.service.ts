import {Injectable} from '@angular/core';
import * as fs from 'file-saver';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor() {
  }

  saveAs(onNext: HttpResponse<Blob>) {
    const blob = new Blob([onNext.body], {type: 'application/octet-stream'});
    const filename = onNext.headers.get('Content-Disposition').split(';')[1].split('=')[1];
    fs.saveAs(blob, filename);
  }
}
