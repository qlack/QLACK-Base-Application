import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {CanActivateGuard} from "./shared/guards/can-activate-guard";
import {AppModule} from "./app.module";

// Configuration of Router with all available AppConstants.Routes.
export const routing: ModuleWithProviders<AppModule> = RouterModule.forRoot([
    // Redirect for empty path.
    {path: "", redirectTo: "home", pathMatch: "full"},

    // Generic components.
    {path: "login", component: LoginComponent},
    {path: "logout", component: LogoutComponent},

    // App modules.
    {
      path: "home",
      loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: ""}
    },
    {
      path: "employee",
      loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Tables & CRUD"}
    },
    {
      path: "http",
      loadChildren: () => import("./http/http.module").then(m => m.HttpModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "HTTP"}
    },
    {
      path: "files",
      loadChildren: () => import("./files/files.module").then(m => m.FilesModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Files"}
    },
    {
      path: "forms",
      loadChildren: () => import("./forms/forms.module").then(m => m.FormsModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Forms"}
    },
    {
      path: "sensitive",
      loadChildren: () => import("./sensitive/sensitive.module").then(m => m.SensitiveModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Data filtering"}
    },
    {
      path: "popups",
      loadChildren: () => import("./popups/popups.module").then(m => m.PopupsModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Popups"}
    },
    {
      path: "i18n",
      loadChildren: () => import("./i18n/i18n.module").then(m => m.I18nModule),
      canActivate: [CanActivateGuard],
      data: {breadcrumb: "Internationalisation"}
    },
  ],
  {
    enableTracing: false,
    scrollPositionRestoration: "top"
  });
