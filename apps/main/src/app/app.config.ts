import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {ENVIRONMENT, loggerInterceptor} from "@esquare-mission/logger";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptors([loggerInterceptor]),),
    {provide: ENVIRONMENT, useValue: environment},
  ],
};
