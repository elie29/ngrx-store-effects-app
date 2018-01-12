import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// Load pizzas
export const LOAD_PIZZAS = '[Products] load pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] load pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] load pizzas success';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  // We return a message
  constructor(public payload: string) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  // We return a pizza
  constructor(public payload: Pizza[]) {}
}

// Create Pizza
export const CREATE_PIZZA = '[Products] create pizza';
export const CREATE_PIZZA_FAIL = '[Products] create pizza fail';
export const CREATE_PIZZA_SUCCESS = '[Products] create pizza success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: string) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// Update pizza
export const UPDATE_PIZZA = '[Products] update pizza';
export const UPDATE_PIZZA_FAIL = '[Products] update pizza fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] update pizza success';

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: string) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// Delete pizza
export const DELETE_PIZZA = '[Products] delete pizza';
export const DELETE_PIZZA_FAIL = '[Products] delete pizza fail';
export const DELETE_PIZZA_SUCCESS = '[Products] delete pizza success';

export class DeletePizza implements Action {
  readonly type = DELETE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class DeletePizzaFail implements Action {
  readonly type = DELETE_PIZZA_FAIL;
  constructor(public payload: string) {}
}

export class DeletePizzaSuccess implements Action {
  readonly type = DELETE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// action type
export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | CreatePizza
  | CreatePizzaFail
  | CreatePizzaSuccess
  | UpdatePizza
  | UpdatePizzaFail
  | UpdatePizzaSuccess
  | DeletePizza
  | DeletePizzaFail
  | DeletePizzaSuccess;
