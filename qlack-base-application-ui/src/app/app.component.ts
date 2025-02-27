import {Component, OnInit} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {BaseComponent} from "./shared/component/base-component";
import {AppConstants} from "./app.constants";
import {TranslateService} from "@ngx-translate/core";
import {JwtTrackerService} from "./shared/service/jwt-tracker.service";
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {TopbarComponent} from './layout/topbar/topbar.component';
import {BreadcrumbComponent} from './shared/component/breadcrumb/breadcrumb.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NgIf} from '@angular/common';
import {NgProgressbar} from 'ngx-progressbar';
import {JwtHelperService} from './shared/service/jwt-helper.service';
import {NgProgressHttp} from 'ngx-progressbar/http';

@Component({
  selector: "app-root",
  imports: [
    SidebarComponent,
    TopbarComponent,
    BreadcrumbComponent,
    RouterOutlet,
    FooterComponent,
    NgIf,
    NgProgressbar,
    NgProgressHttp
  ],
  templateUrl: "./app.component.html"
})
export class AppComponent extends BaseComponent implements OnInit {
  // Controller for sidebar's visibility.
  sidebarVisibility = true;

  constructor(private router: Router, private jwtService: JwtHelperService,
              private translate: TranslateService,
              private jwtTrackerService: JwtTrackerService) {
    super();

    // Check if a specific theme has already been saved for this user.
    // tslint:disable-next-line:no-unused-expression
    const theme = localStorage.getItem(this.constants.LOCAL_STORAGE_THEME);
    if (theme) {
      this.logger.logInfo(`Setting theme to '${theme}'.`);
      document.querySelector("html")!.setAttribute("data-theme", theme);
    }

    // Initialise translations.
    this.translate.setDefaultLang(AppConstants.DEFAULT_LANGUAGE);
    this.translate.use(AppConstants.DEFAULT_LANGUAGE);

    // Check if an expired JWT exists and remove it.
    const jwtString = localStorage.getItem(this.constants.JWT_STORAGE_NAME);
    if (jwtString) {
      try {
        if (this.jwtService.isTokenExpired(jwtString)) {
          this.logger.logDebug("Removing expired JWT.");
          localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
        }
      } catch (err) {
        this.logger.logDebug("Could not decode JWT, removing it.");
        localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
      }
    } else {
      this.logger.logDebug("Did not find a JWT.");
    }
  }

  ngOnInit() {
    this.logger.logInfo("Initialising application.");
    if (!this.isLoggedIn()) {
      this.logger.logDebug("User is not logged in (JWT not found). Redirecting to login.");
      this.router.navigate(["login"]);
    } else {
      this.logger.logDebug("User is logged in (JWT found).");

      // Monitor token expiration.
      this.jwtTrackerService.startTracking();
    }
  }

  toggleSidebar() {
    this.sidebarVisibility = !this.sidebarVisibility;
  }
}

