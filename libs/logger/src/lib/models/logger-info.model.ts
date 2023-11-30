export interface LoggerInfo {
  httpMessageFormat: string;
  exceptionMessageFormat: string;
  bufferTime?: number;
  logToConsole: boolean;
  logToLocalStorage: boolean;
  prod: boolean;
}
