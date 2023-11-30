import {TestBed} from '@angular/core/testing';

import {LoggerService} from './logger.service';
import {LOGGER_INFO} from "../../tokens/logger.token";
import {ExceptionMessage} from "../../models/exception-message.model";
import {LoggerInfo} from "../../models/logger-info.model";
import * as bufferedTimeRxjs from 'rxjs';
import {map} from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";

describe('LoggerService', () => {

  // @ts-ignore
  jest.spyOn(bufferedTimeRxjs, 'bufferTime')
    .mockReturnValue((source => {
      return source.pipe(map(res => [res]))
    }));

  let service: LoggerService;

  const loggerInfo: LoggerInfo = {
    prod: true,
    exceptionMessageFormat: 'message: {{message}}, stack: {{stack}}, timestamp: {{timestamp}}',
    httpMessageFormat: 'message: {{message}}, timestamp: {{timestamp}}',
    logToConsole: true,
    logToLocalStorage: true,
    bufferTime: 1000
  };

  const consoleErrorSpy = jest.spyOn(console, 'error');


  beforeEach(() => {
    localStorage.clear();
  })

  afterEach(() => {
    localStorage.clear();
    consoleErrorSpy.mockReset();
  });

  it('should be created', () => {
    setTestBed( loggerInfo);
    expect(service).toBeTruthy();
  });

  it('should log an exception to console and local storage', () => {
    setTestBed( loggerInfo);
    const error0: ExceptionMessage = { message: 'Test exception', stack: 'Test stack'};
    const error1: ExceptionMessage = { message: 'Another Test exception', stack: 'Test stack'};
    service.log(error0);
    service.log(error1);
    const storedError0 = localStorage.getItem('error message - 1');
    const storedError1 = localStorage.getItem('error message - 2');
    expect(storedError0).toContain('Test exception, stack: Test stack, timestamp:');
    expect(storedError1).toContain('Another Test exception, stack: Test stack, timestamp:');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Test exception, stack: Test stack, timestamp:'));
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Another Test exception, stack: Test stack, timestamp:'));
  });

  it('should log an HTTP error to console and local storage', () => {
    setTestBed( loggerInfo);
    const error: HttpErrorResponse = new HttpErrorResponse({statusText: 'Test HTTP error'});
    service.log(error);
    const storedError = localStorage.getItem('error message - 1');
    expect(storedError).toContain('message: Http failure response for (unknown url): undefined Test HTTP error, timestamp:');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('essage: Http failure response for (unknown url): undefined Test HTTP error, timestamp:'));
  });

  it('should not log', () => {
    setTestBed( {...loggerInfo, prod: false});
    service = TestBed.inject(LoggerService);
    const exceptionError: ExceptionMessage = { message: 'Test exception', stack: 'Test stack'};
    const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({statusText: 'Test HTTP error'});
    service.log(exceptionError);
    service.log(httpErrorResponse);
    expect(localStorage.getItem('error message - 1')).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  function setTestBed(loggerInfo: LoggerInfo) {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOGGER_INFO, useValue: loggerInfo }
      ],
    });
    service = TestBed.inject(LoggerService);
  }

});


