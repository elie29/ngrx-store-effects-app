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

import { getPizzasLoaded, LoadPizzas, ProductsState } from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkPizzas().pipe(
      switchMap(_ => of(true)),
      catchError(_ => of(false))
    );
  }

  private checkPizzas(): Observable<boolean> {
    return this.store.select(getPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
