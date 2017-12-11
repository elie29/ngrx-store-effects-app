import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PizzasService } from '../../services';
import { LOAD_PIZZAS } from '../../store';
import { LoadPizzasFail, LoadPizzasSuccess } from '../actions';

@Injectable()
export class PizzasEffects {
  constructor(private action$: Actions, private service: PizzasService) {}

  // With pipe, we can import pure function instead of using patches
  @Effect()
  loadPizzas$ = this.action$.ofType(LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.service
        .getPizzas()
        .pipe(
          map(pizzas => new LoadPizzasSuccess(pizzas)),
          catchError(error => of(new LoadPizzasFail(error)))
        );
    })
  );
}
