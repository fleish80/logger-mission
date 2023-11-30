import {LoggerInfo} from "../models/logger-info.model";
import {makeEnvironmentProviders} from "@angular/core";
import {LOGGER_INFO} from "../tokens/logger.token";
import {loggerInterceptor} from "../interceptors/logger.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";

export function provideLogger(loggerInfo: LoggerInfo) {
  return [
    provideHttpClient(withInterceptors([loggerInterceptor])),
    makeEnvironmentProviders([{provide: LOGGER_INFO, useValue: {bufferTime: 5000, ...loggerInfo}}])
  ];

}
