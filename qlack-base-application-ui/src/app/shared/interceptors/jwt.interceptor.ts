import {HttpInterceptorFn} from "@angular/common/http";
import {AppConstants} from '../../app.constants';
import {HTTP_TOKEN_CONFIG} from './http-token.config';
import {inject} from '@angular/core';
import {LumberjackService} from '@ngworker/lumberjack';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AppConstants.JWT_STORAGE_NAME);
  const config = inject(HTTP_TOKEN_CONFIG);
  const logger = inject(LumberjackService);

  if (config.routes.some((route) => req.url.startsWith(route))) {
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(cloned);
    } else {
      logger.logWarning("Requested route with JWT but no token found, proceeding without token.");
      return next(req);
    }
  } else {
    return next(req);
  }
};
