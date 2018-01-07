import { Pizza } from '../../models/pizza.model';
import {
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction
} from '../actions/pizzas.action';

export interface Entities {
  [id: number]: Pizza;
}

export interface PizzaState {
  entities: Entities;
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: PizzasAction
): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      // Flatten the array into object
      const entities = flattenArray(pizzas, state.entities);
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

function flattenArray(pizzas: Pizza[], entities: Entities) {
  return pizzas.reduce(
    (entities: Entities, pizza: Pizza) => {
      // we add to entities the current pizza
      return { ...entities, [pizza.id]: pizza };
    },
    { ...entities } // initial state
  );
}

/**
 * shortcut functions used in reducers/index.ts
 */
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasAsArray = (entities: Entities) => {
  return Object.keys(entities).map(id => entities[+id]);
};
