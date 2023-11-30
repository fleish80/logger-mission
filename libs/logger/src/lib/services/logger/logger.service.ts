import {inject, Injectable} from '@angular/core';
import {ExceptionMessage} from '../../models/exception-message.model';
import {HttpErrorResponse} from '@angular/common/http';
import {bufferTime, Subject} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LOGGER_INFO} from '../../tokens/logger.token';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  #counter = 0;
  #debounceSubject = new Subject<ExceptionMessage | HttpErrorResponse | null>();
  #loggerInfo = inject(LOGGER_INFO);


  constructor() {
    const errorCounter = localStorage.getItem('error-counter');
    this.#counter = errorCounter ? +errorCounter : 0;
    this.#debounceMessage();
  }

  log(error: ExceptionMessage | HttpErrorResponse) {
    if (this.#loggerInfo.prod) {
      this.#debounceSubject.next(error);
    }
  }

  #logException({message, stack}: ExceptionMessage) {
    const displayedMessage = this.#loggerInfo.exceptionMessageFormat
      .replace(/{{message}}/g, message)
      .replace(/{{stack}}/g, stack)
      .replace(/{{timestamp}}/g, new Date().toString());
    if (this.#loggerInfo.logToConsole) {
      console.error(displayedMessage);
    }
    if (this.#loggerInfo.logToLocalStorage) {
      localStorage.setItem(`error message - ${++this.#counter}`, displayedMessage);
      localStorage.setItem('error-counter', this.#counter.toString());
    }
  }

  #logHttpError({message}: HttpErrorResponse) {
    const displayedMessage = this.#loggerInfo.httpMessageFormat
      .replace(/{{message}}/g, message)
      .replace(/{{timestamp}}/g, new Date().toString());
    if (this.#loggerInfo.logToConsole) {
      console.error(displayedMessage);
    }
    if (this.#loggerInfo.logToLocalStorage) {
      localStorage.setItem(`error message - ${++this.#counter}`, JSON.stringify(displayedMessage));
      localStorage.setItem('error-counter', this.#counter.toString());
    }
  }

  #debounceMessage() {
    this.#debounceSubject.pipe(
      bufferTime(this.#loggerInfo.bufferTime!),
      takeUntilDestroyed()
    ).subscribe((errors) => {
      errors.forEach(error => {
        if (error instanceof HttpErrorResponse) {
          this.#logHttpError(error);
        } else {
          this.#logException(error!);
        }
      });
    })
  }

}
