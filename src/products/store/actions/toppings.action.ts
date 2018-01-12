import { Action } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

// Load toppings
export const LOAD_TOPPINGS = '[Products] load toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] load toppings fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] load toppings success';
export const VISUALISE_TOPPINGS = '[Products] visualise toppings';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: string) {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class VisualiseToppings implements Action {
  readonly type = VISUALISE_TOPPINGS;
  constructor(public payload: number[]) {}
}

// action type
export type ToppingsAction =
  | LoadToppings
  | LoadToppingsFail
  | LoadToppingsSuccess
  | VisualiseToppings;
