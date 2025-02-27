import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {authGuard} from './shared/guards/can-activate-guard';

export const routes: Routes = [
  // Redirect for empty path.
  {path: "", redirectTo: "home", pathMatch: "full"},

  // Generic components.
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},

  // App modules.
  {
    path: "home",
    loadChildren: () => import("./home/home.routes").then(m => m.HomeRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: ""}
  },
  {
    path: "employee",
    loadChildren: () => import("./employee/employee.routes").then(m => m.EmployeeRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Tables & CRUD"}
  },
  {
    path: "http",
    loadChildren: () => import("./http/http.routes").then(m => m.HttpRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "HTTP"}
  },
  {
    path: "files",
    loadChildren: () => import("./files/files.routes").then(m => m.FilesRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Files"}
  },
  {
    path: "forms",
    loadChildren: () => import("./forms/forms.routes").then(m => m.FormsRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Forms"}
  },
  {
    path: "sensitive",
    loadChildren: () => import("./sensitive/sensitive.routes").then(m => m.SensitiveRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Data filtering"}
  },
  {
    path: "popups",
    loadChildren: () => import("./popups/popups.routes").then(m => m.PopupsRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Popups"}
  },
  {
    path: "i18n",
    loadChildren: () => import("./i18n/i18n.routes").then(m => m.I18nRoutes),
    canActivate: [authGuard],
    data: {breadcrumb: "Internationalisation"}
  }
];
