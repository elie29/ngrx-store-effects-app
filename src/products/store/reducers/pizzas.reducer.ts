import { flattenArray } from '../../../utils/array';
import { Pizza } from '../../models/pizza.model';
import {
  CREATE_PIZZA,
  CREATE_PIZZA_FAIL,
  CREATE_PIZZA_SUCCESS,
  DELETE_PIZZA,
  DELETE_PIZZA_FAIL,
  DELETE_PIZZA_SUCCESS,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction,
  UPDATE_PIZZA,
  UPDATE_PIZZA_FAIL,
  UPDATE_PIZZA_SUCCESS
} from '../actions/pizzas.action';

interface Entities {
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
    case LOAD_PIZZAS:
    case CREATE_PIZZA:
    case UPDATE_PIZZA:
    case DELETE_PIZZA:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_PIZZAS_FAIL:
    case CREATE_PIZZA_FAIL:
    case UPDATE_PIZZA_FAIL:
    case DELETE_PIZZA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
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

    case CREATE_PIZZA_SUCCESS:
    case UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = { ...state.entities, [pizza.id]: pizza };
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = { ...state.entities };
      delete entities[pizza.id];
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
  }
  return state;
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
