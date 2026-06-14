import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const messages = getErrorMessages(error);

      switch (error.status) {
        case 400:
          if (error.error?.errors || Array.isArray(error.error)) {
            return throwError(() => messages);
          }

          toastr.error(messages[0], error.status.toString());
          return throwError(() => messages);
          
        case 401:
          toastr.error(messages[0] ?? "Unauthorized");
          return throwError(() => messages);
          
        case 404:
          toastr.error(messages[0] ?? "Not found", error.status.toString());
          return throwError(() => messages);
          
        case 500:
          toastr.error(messages[0] ?? "Server Error", error.status.toString());
          return throwError(() => messages);

        default:
          toastr.error(messages[0] ?? "Something unexpected went wrong")
          return throwError(() => messages)
      }
    })
  );
};

function getErrorMessages(error: HttpErrorResponse): string[] {
  const payload = error.error;

  if(Array.isArray(payload)) {
    return payload.map(e => {
      if (typeof e === "string") return e;
      if (e?.description) return e.description;
      if (e?.message) return e.message;
      return JSON.stringify(e);
    });
  }

  if (payload?.errors) {
    return Object.values(payload.errors).flat().map(e => String(e));
  }

  if (typeof payload === "string") {
    return [payload];
  }

  if (payload?.message) {
    return [payload.message];
  }

  return ["Something unexpected went wrong"];
}