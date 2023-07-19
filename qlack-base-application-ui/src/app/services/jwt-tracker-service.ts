import {Injectable} from "@angular/core";
import {AppConstants} from "../app.constants";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {
  OkCancelModalComponent
} from "../shared/component/ok-cancel-modal/ok-cancel-modal.component";

@Injectable({
  providedIn: "root"
})
export class JwtTrackerService {
  private checkInterval: number | undefined;

  constructor(private jwtService: JwtHelperService, private dialog: MatDialog) {
  }

  stopTracking() {
    // Clear any existing timer.
    if (this.checkInterval) {
      window.clearInterval(this.checkInterval);
    }
  }

  startTracking() {
    // Setup the timer.
    this.checkInterval = setInterval(() => {
      let tokenExpired = false;
      const jwtString = localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
      if (jwtString) {
        try {
          tokenExpired = this.jwtService.isTokenExpired(jwtString);
        } catch (err) {
          // Ignore error, user does not have a JWT.
        }
      }

      if (tokenExpired) {
        // Setup a timer to check for token expiration.
        this.stopTracking();
        this.dialog.open(OkCancelModalComponent, {
          disableClose: true,
          data: {
            title: "Session expired",
            question: "Your session has expired. Reload the page to refresh it.",
            buttons: {
              ok: false,
              cancel: false,
              reload: true
            }
          }
        });
      }
    }, 1000);
  }

}
