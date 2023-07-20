import { Component, OnInit } from "@angular/core";
import {HttpService} from "../http.service";
import {UtilityService} from "../../shared/service/utility.service";

@Component({
  selector: "app-http",
  templateUrl: "./http-view.component.html"
})
export class HttpViewComponent implements OnInit {
  process = "NOT STARTED";

  constructor(private httpService: HttpService, private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  longRequestPB() {
    this.process = "STARTED";
    this.httpService.longRequestPB().subscribe({
      next: onNext => {
        this.process = "FINISHED";
      }, error: onError => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }

  longRequest() {
    this.process = "STARTED";
    this.httpService.longRequest().subscribe({
      next: onNext => {
        this.process = "FINISHED";
      }, error: onError => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }
}
