import {inject, Injectable} from '@angular/core';
import {ExceptionMessage} from "../../models/exception-message.model";
import {LoggerOptions} from "../../models/logger-options.model";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpMessage} from "../../models/http-message.model";
import {Subject} from "rxjs";
import {ENVIRONMENT} from "../../tokens/environment.token";
import {debounceTime} from "rxjs/operators";


const DEBOUNCE_TIME = 500;

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  #counter = 0;
  #debounceSubject = new Subject<ExceptionMessage | HttpErrorResponse | null>();
  #environment = inject(ENVIRONMENT);

  constructor() {
    this.#debounceMessage();
  }

  log(error: ExceptionMessage | HttpErrorResponse) {
    if (this.#environment.prod) {
      this.#debounceSubject.next(error);
    }
  }

  #logException({message, stack}: ExceptionMessage, options?: LoggerOptions) {
    options = {...{console: true, localstorage: true}, ...options};
    const updatedMessage: ExceptionMessage = {message, stack, timestamp: new Date().toString()};
    if (options.console) {
      console.error(updatedMessage);
    }
    if (options.localstorage) {
      localStorage.setItem(`error message - ${++this.#counter}`, JSON.stringify(updatedMessage));
    }
  }

  #logHttpError({message}: HttpErrorResponse, options?: LoggerOptions) {
    options = {...{console: true, localstorage: true}, ...options};
    const updatedMessage: HttpMessage = {message, timestamp: new Date().toString()};
    if (options.console) {
      console.error(updatedMessage);
    }
    if (options.localstorage) {
      localStorage.setItem(`error message - ${++this.#counter}`, JSON.stringify(updatedMessage));
    }
  }

  #debounceMessage() {
    this.#debounceSubject.pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe((error) => {
        if (error) {
          if (error instanceof HttpErrorResponse) {
            this.#logHttpError(error);
          } else {
            this.#logException(error!);
          }
        }
      })
  }

}
