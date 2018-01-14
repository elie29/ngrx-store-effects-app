import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';

import {
  getPizzasEntities,
  getPizzasLoaded,
  LoadPizzas,
  ProductsState
} from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkPizzas().pipe(
      switchMap(_ => {
        const id = +route.params.pizzaId;
        return this.hasPizza(id);
      })
    );
  }

  private hasPizza(id: number): Observable<boolean> {
    return this.store
      .select(getPizzasEntities)
      .pipe(map(entities => !!entities[id]), take(1));
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
