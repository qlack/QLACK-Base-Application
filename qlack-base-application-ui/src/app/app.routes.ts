import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './auth/login.component';
import {NewPasswordComponent} from './auth/new-password.component';
import {LogoutComponent} from './auth/logout.component';
import {ForgotPasswordComponent} from './auth/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {FileuploadComponent} from './fileupload/fileupload.component';

// Configuration of Router with all available AppConstants.Routes.
export const routing: ModuleWithProviders = RouterModule.forRoot([
    // Redirect for empty path.
    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},
    {path: 'new-password', component: NewPasswordComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {path: 'fileupload', component: FileuploadComponent},
    //default redirect
    {path: '**', redirectTo: 'login'},
  ],
  {
    enableTracing: false
  });
