import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {environment} from "../environments/environment";
import {provideLogger} from "@esquare-mission/logger";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    provideLogger({
      prod: environment.prod,
      exceptionMessageFormat: 'message: {{message}}, stack: {{stack}}, timestamp: {{timestamp}}',
      httpMessageFormat: 'message: {{message}}, timestamp: {{timestamp}}',
      logToConsole: true,
      logToLocalStorage: true
    })
  ],
};
