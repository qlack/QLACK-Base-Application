import { Component } from "@angular/core";
import {HttpService} from "../http.service";
import {UtilityService} from "../../shared/service/utility.service";

@Component({
  selector: "app-http",
  templateUrl: "./http-view.component.html"
})
export class HttpViewComponent {
  process = "NOT STARTED";

  constructor(private httpService: HttpService, private utilityService: UtilityService) { }

  longRequestPB() {
    this.process = "STARTED";
    this.httpService.longRequestPB().subscribe({
      next: () => {
        this.process = "FINISHED";
      }, error: () => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }

  longRequest() {
    this.process = "STARTED";
    this.httpService.longRequest().subscribe({
      next: () => {
        this.process = "FINISHED";
      }, error: () => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }
}
