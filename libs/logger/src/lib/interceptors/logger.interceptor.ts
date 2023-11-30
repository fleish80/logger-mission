import { HttpInterceptorFn } from '@angular/common/http';
import {catchError} from "rxjs";
import {inject} from "@angular/core";
import {LoggerService} from "../services/logger/logger.service";

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {

  const loggerService = inject(LoggerService);

  return next(req).pipe(
    catchError(err => {
      loggerService.log(err);
      throw err;
    })
  );
};
