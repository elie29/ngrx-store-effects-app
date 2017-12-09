import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// Load pizzas
export const LOAD_PIZZAS = '[Products] load pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] load pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] load pizzas success';

export class LoadPizzas implements Action
{
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action
{
  readonly type = LOAD_PIZZAS_FAIL;
  // We return a message
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action
{
  readonly type = LOAD_PIZZAS_SUCCESS;
  // We return a pizza
  constructor(public payload: Pizza[]) { }
}

// action type
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;
