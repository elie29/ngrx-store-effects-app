import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import { getSelectedToppings, getToppingEntities } from './toppings.selectors';

/**
 * Select pizzas state from the products state
 * A selector takes a feature selector or a combination of selectors
 * and return slice of the state
 */
export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// Select entities from pizzas state selector
export const getPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities // shortcut method in pizza.reducer
);

// Select .loading from pizzas state
export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);

// Select .loaded from pizzas state
export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);

// Select Pizza[] from pizzas entities
export const getAllPizzas = createSelector(
  getPizzasEntities,
  fromPizzas.getPizzasAsArray
);

// select a pizza using a combination of pizzas entities and current route
export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

// select visualised pizza from selected pizza, toppings and selected toppings
export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  getToppingEntities,
  getSelectedToppings,
  (pizza, toppingsEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingsEntities[id]);
    return { ...pizza, toppings };
  }
);
