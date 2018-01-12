import { flattenArray } from '../../../utils/array';
import { Topping } from '../../models/topping.model';
import {
  LOAD_TOPPINGS,
  LOAD_TOPPINGS_FAIL,
  LOAD_TOPPINGS_SUCCESS,
  ToppingsAction,
  VISUALISE_TOPPINGS
} from '../actions';

interface Entities {
  [id: number]: Topping;
}

export interface ToppingsState {
  entities: Entities;
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = initialState,
  action: ToppingsAction
): ToppingsState {
  switch (action.type) {
    case LOAD_TOPPINGS:
      return { ...state, loaded: false, loading: true };

    case LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = flattenArray(toppings, state.entities);
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case LOAD_TOPPINGS_FAIL:
      return { ...state, loaded: false, loading: false };

    case VISUALISE_TOPPINGS: {
      const selectedToppings: number[] = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
  }
  return state;
}

/**
 * shortcut functions used in reducers/index.ts
 */
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsAsArray = (entities: Entities) => {
  return Object.keys(entities).map(id => entities[+id]);
};
export const getSelectedToppins = (state: ToppingsState) =>
  state.selectedToppings;
