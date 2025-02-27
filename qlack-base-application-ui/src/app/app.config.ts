import {ApplicationConfig, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideLumberjack} from "@ngworker/lumberjack";
import {provideNgProgressOptions} from "ngx-progressbar";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideLumberjackConsoleDriver} from '@ngworker/lumberjack/console-driver';
import {progressInterceptor, provideNgProgressHttp} from 'ngx-progressbar/http';
import {jwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {HTTP_TOKEN_CONFIG} from './shared/interceptors/http-token.config';
import {AppConstants} from './app.constants';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {httpBusyInterceptor} from './shared/interceptors/hhtp-busy.interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, "./api/i18n/", "");

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(withInterceptors([progressInterceptor, jwtInterceptor, httpBusyInterceptor])),
    {
      provide: HTTP_TOKEN_CONFIG, useValue: {
        // Define the routes that require a JWT token.
        routes: [
          AppConstants.API_ROOT,
        ]
      }
    },
    provideTranslateService({
      // defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideLumberjack(),
    provideLumberjackConsoleDriver(),
    provideNgProgressOptions({
      flat: false
    }),
    provideNgProgressHttp({
      silentApis: ['https://api.domain.com']
    }),
    provideAnimations(),
    provideMomentDateAdapter(),
  ]
};
