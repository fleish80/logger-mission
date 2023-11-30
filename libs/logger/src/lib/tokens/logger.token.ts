import {InjectionToken} from "@angular/core";
import {LoggerInfo} from "../models/logger-info.model";

export const LOGGER_INFO = new InjectionToken<LoggerInfo>('ENVIRONMENT');
