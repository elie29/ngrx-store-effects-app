import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

// Select products state from the top level store object
// products is the name given in products.module
export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);

// Select pizzas state from the products state
export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

// Select entities from pizzas state
export const getPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

// Select data from pizzas state
export const getAllPizzas = createSelector(
  getPizzasEntities,
  fromPizzas.getPizzasAsArray
);

export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);

export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);
