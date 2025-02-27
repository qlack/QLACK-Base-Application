import {HttpInterceptorFn} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {inject} from '@angular/core';
import {BusyService} from '../service/busy.service';

export const httpBusyInterceptor: HttpInterceptorFn = (req, next) => {
  const busyButtonService = inject(BusyService);
  busyButtonService.setBusy(true);
  return next(req).pipe(
    finalize(() => {
      busyButtonService.setBusy(false);
    })
  );
};
