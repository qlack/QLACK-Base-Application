/* tslint:disable:max-line-length */
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {routing} from "./app.routes";
import {LogoutComponent} from "./auth/logout/logout.component";
import {LoginComponent} from "./auth/login/login.component";
import {JwtModule} from "@auth0/angular-jwt";
import {AppConstants} from "./app.constants";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {QFormsModule} from "@qlack/forms";
import {CanActivateGuard} from "./shared/guards/can-activate-guard";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {QFormValidationModule} from "@qlack/form-validation";
import {NgProgressModule} from "ngx-progressbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {NgOptimizedImage} from "@angular/common";
import {FaConfig, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faBars,
  faChevronDown,
  faDashboard,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFilter,
  faGlobe,
  faHome, faInfo,
  faMessage, faRectangleList,
  faSearch,
  faServer,
  faSwatchbook,
  faTableList, faTriangleExclamation,
  faUpload,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {LayoutModule} from "./layout/layout.module";
import {ComponentsModule} from "./shared/component/components.module";
import {faWpforms} from "@fortawesome/free-brands-svg-icons";

// AoT exported function for factories.
export function getJwtToken(): string | null {
  return localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./api/i18n/", "");
}

// Module declaration.
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        allowedDomains: new Array(new RegExp("^null$"))
      }
    }),
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    NgProgressModule.withConfig({
      trickleSpeed: 500,
      debounceTime: 500,
      meteor: false,
      spinner: false,
      thick: true,
      color: "#ff8500"
    }),
    NgProgressHttpModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    MatMenuModule,
    NgOptimizedImage,
    FontAwesomeModule,
    LayoutModule,
    ComponentsModule,
  ],
  exports: [],
  providers: [
    CookieService,
    CanActivateGuard,
    QFormsModule,
    QFormValidationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    faConfig.fixedWidth = true;
    library.addIcons(faUser, faEye, faEyeSlash, faEnvelope, faDashboard, faBars, faSwatchbook,
      faChevronDown, faHome, faSearch, faTableList, faServer, faUpload, faFilter, faRectangleList,
      faMessage, faGlobe, faInfo, faTriangleExclamation);
  }
}

