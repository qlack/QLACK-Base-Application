import {Component} from "@angular/core";
import {HttpService} from "../http.service";
import {UtilityService} from "../../shared/service/utility.service";
import {BusyButtonDirective} from '../../shared/directives/button-bussy.directive';
import {BusyService} from '../../shared/service/busy.service';
import {BaseComponent} from '../../shared/component/base-component';

@Component({
  selector: "app-http",
  imports: [
    BusyButtonDirective
  ],
  templateUrl: "./http-view.component.html"
})
export class HttpViewComponent extends BaseComponent {

  constructor(private httpService: HttpService, private utilityService: UtilityService,
              private busyService: BusyService) {
    super();
  }

  isBusy() {
    return this.busyService.isBusy;
  }

  longRequestPB() {
    this.httpService.longRequestPB().subscribe({
      next: () => {
        this.logger.logDebug("Request completed.");
      }, error: () => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }

  longRequest() {
    this.httpService.longRequest().subscribe({
      next: () => {
        this.logger.logDebug("Request completed.");
      }, error: () => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }
}
