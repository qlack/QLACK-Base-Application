import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Log} from "ng2-logger/browser";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BaseComponent} from "./shared/component/base-component";
import {AppConstants} from "./app.constants";
import {AuthService} from "./auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {JwtTrackerService} from "./services/jwt-tracker-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent extends BaseComponent implements OnInit {
  // Logger.
  private log = Log.create("AppComponent");

  // Controller for sidebar's visibility.
  sidebarVisibility = true;

  constructor(private authService: AuthService, private router: Router,
              private jwtService: JwtHelperService, private translate: TranslateService,
              private jwtTrackerService: JwtTrackerService) {
    super();

    // Check if a specific theme has already been saved for this user.
    // tslint:disable-next-line:no-unused-expression
    var theme = localStorage.getItem(this.constants.LOCAL_STORAGE_THEME);
    if (theme) {
      this.log.info(`Setting theme to '${theme}'.`);
      document.querySelector("html")!.setAttribute("data-theme", theme);
    }

    // Initialise translations.
    translate.setDefaultLang(AppConstants.DEFAULT_LANGUAGE);
    translate.use(AppConstants.DEFAULT_LANGUAGE);

    // Check if an expired JWT exists and remove it.
    const jwtString = localStorage.getItem(this.constants.JWT_STORAGE_NAME);
    if (jwtString) {
      try {
        if (this.jwtService.isTokenExpired(jwtString)) {
          this.log.data("Removing expired JWT.");
          localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
        }
      } catch (err) {
        this.log.data("Could not decode JWT, removing it.");
        localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
      }
    } else {
      this.log.data("Did not find a JWT.");
    }
  }

  ngOnInit() {
    this.log.info("Initialising application.");
    if (!this.isLoggedIn()) {
      this.log.data("User is not logged in (JWT not found). Redirecting to login.");
      this.router.navigate(["login"]);
    } else {
      this.log.data("User is logged in (JWT found).");

      // Monitor token expiration.
      this.jwtTrackerService.startTracking();
    }
  }

  toggleSidebar() {
    this.sidebarVisibility = !this.sidebarVisibility;
  }
}

