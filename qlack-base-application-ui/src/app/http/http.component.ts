import { Component, OnInit } from '@angular/core';
import {HttpService} from "./http.service";

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {
  process = "NOT STARTED";

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  longRequestPB() {
    this.process = "STARTED";
    this.httpService.longRequestPB().subscribe(onNext => {
      this.process = "FINISHED";
    })
  }

  longRequest() {
    this.process = "STARTED";
    this.httpService.longRequest().subscribe(onNext => {
      this.process = "FINISHED";
    })
  }
}
