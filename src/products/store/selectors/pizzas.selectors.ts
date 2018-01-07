import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

// Select pizzas state from the products state
export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// Select entities from pizzas state
export const getPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

// select a pizza
export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.pizzaId];
  }
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
