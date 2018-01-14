import { flattenArray } from '../../../utils/array';
import { Pizza } from '../../models/pizza.model';
import * as fromActions from '../actions/pizzas.action';

interface PizzasEntities {
  [id: number]: Pizza;
}

export interface PizzaState {
  entities: PizzasEntities;
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
  action: fromActions.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromActions.LOAD_PIZZAS:
    case fromActions.CREATE_PIZZA:
    case fromActions.UPDATE_PIZZA:
    case fromActions.DELETE_PIZZA:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case fromActions.LOAD_PIZZAS_FAIL:
    case fromActions.CREATE_PIZZA_FAIL:
    case fromActions.UPDATE_PIZZA_FAIL:
    case fromActions.DELETE_PIZZA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromActions.LOAD_PIZZAS_SUCCESS: {
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

    case fromActions.CREATE_PIZZA_SUCCESS:
    case fromActions.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = { ...state.entities, [pizza.id]: pizza };
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromActions.DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      // removed is not used just for destruction purpose
      const { [pizza.id]: removed, ...entities } = state.entities;
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
 * shortcut functions
 */
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasAsArray = (entities: PizzasEntities) => {
  return Object.keys(entities).map(id => entities[+id]);
};
