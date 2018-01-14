import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import { PizzasService } from '../../services';
import * as pizzaActions from '../../store/actions';

@Injectable()
export class PizzasEffects {
  constructor(private action$: Actions, private service: PizzasService) {}

  // With pipe, we can import pure function instead of using patches
  @Effect()
  loadPizzas$ = this.action$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .getPizzas()
        .pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        );
    })
  );

  @Effect()
  createPizza$ = this.action$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
        );
    })
  );

  // Separate effets is better than adding navigation in pipe above
  @Effect()
  createPizzaSuccess$ = this.action$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(pizza => new fromRoot.Go({ path: ['/products', pizza.id] }))
    );

  @Effect()
  updatePizza$ = this.action$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  deletePizza$ = this.action$.ofType(pizzaActions.DELETE_PIZZA).pipe(
    map((action: pizzaActions.DeletePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service.removePizza(pizza).pipe(
        // removePizza does not return a pizza
        map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
      );
    })
  );

  // Separate effets is better than adding navigation in pipe above
  @Effect()
  updatePizzaSuccess$ = this.action$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.DELETE_PIZZA_SUCCESS
    )
    .pipe(map(() => new fromRoot.Go({ path: ['/products'] })));
}
