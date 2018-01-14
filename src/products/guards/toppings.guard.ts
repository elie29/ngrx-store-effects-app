import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';

import { getToppingsLoaded, LoadToppings, ProductsState } from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(_ => of(true)),
      catchError(_ => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getToppingsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
