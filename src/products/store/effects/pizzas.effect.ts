import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PizzasService } from '../../services';
import {
  CREATE_PIZZA,
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  DELETE_PIZZA,
  DeletePizza,
  DeletePizzaFail,
  DeletePizzaSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess,
  UPDATE_PIZZA,
  UpdatePizza,
  UpdatePizzaFail,
  UpdatePizzaSuccess
} from '../../store';

@Injectable()
export class PizzasEffects {
  constructor(private action$: Actions, private service: PizzasService) {}

  // With pipe, we can import pure function instead of using patches
  @Effect()
  loadPizzas$ = this.action$.ofType(LOAD_PIZZAS).pipe(
    switchMap(() => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .getPizzas()
        .pipe(
          map(pizzas => new LoadPizzasSuccess(pizzas)),
          catchError(error => of(new LoadPizzasFail(error)))
        );
    })
  );

  @Effect()
  createPizzas$ = this.action$.ofType(CREATE_PIZZA).pipe(
    map((action: CreatePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .createPizza(pizza)
        .pipe(
          map(pizza => new CreatePizzaSuccess(pizza)),
          catchError(error => of(new CreatePizzaFail(error)))
        );
    })
  );

  @Effect()
  updatePizzas$ = this.action$.ofType(UPDATE_PIZZA).pipe(
    map((action: UpdatePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service
        .updatePizza(pizza)
        .pipe(
          map(pizza => new UpdatePizzaSuccess(pizza)),
          catchError(error => of(new UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  deletePizzas$ = this.action$.ofType(DELETE_PIZZA).pipe(
    map((action: DeletePizza) => action.payload),
    switchMap(pizza => {
      // Returns always observable so error is caught inside switchMap
      return this.service.removePizza(pizza).pipe(
        // removePizza does not return a pizza
        map(() => new DeletePizzaSuccess(pizza)),
        catchError(error => of(new DeletePizzaFail(error)))
      );
    })
  );
}
