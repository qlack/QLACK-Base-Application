import {InjectionToken} from '@angular/core';

export interface HttpTokenConfig {
  routes: string[]
}

export const HTTP_TOKEN_CONFIG = new InjectionToken<HttpTokenConfig>("HttpTokenConfig");
