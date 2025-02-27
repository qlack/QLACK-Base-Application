import {Component, OnInit, Renderer2} from "@angular/core";
import {BaseComponent} from "../../shared/component/base-component";
import {AuthService} from "../auth.service";
import {JwtTrackerService} from "../../shared/service/jwt-tracker.service";
import {RouterLink} from '@angular/router';

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  imports: [
    RouterLink
  ]
})
export class LogoutComponent extends BaseComponent implements OnInit {
  constructor(private authService: AuthService, private renderer: Renderer2,
              private jwtTrackerService: JwtTrackerService) {
    super();
  }

  ngOnInit(): void {
    this.renderer.setAttribute(document.body, "style",
      "background-image:  linear-gradient(to top, rgba(0,0,0,0)" +
      " 30%, rgba(255,255,255,0.62) 64%, rgba(255,255,255,1) 89%), url(/img/bg.jpg);" +
      " background-size: cover;");

    this.authService.logout().subscribe({
      next: () => {
        this.logger.logDebug("Successfully terminated session.");
        localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
        this.jwtTrackerService.stopTracking();
      }, error: () => {
        this.logger.logError("Could not terminate session.");
        localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
        this.jwtTrackerService.stopTracking();
      }
    });
  }
}
