import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as RouterActions from '../actions';

@Injectable()
export class RouuterEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private location: Location
  ) {}

  // No need to dispatch action, just redircet user
  @Effect({ dispatch: false })
  navigate$ = this.action$
    .ofType(RouterActions.GO)
    .pipe(
      map((action: RouterActions.Go) => action.payload),
      tap(({ path, query: queryParams, extra }) =>
        this.router.navigate(path, { queryParams, ...extra })
      )
    );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.action$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
