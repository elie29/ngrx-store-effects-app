import { flattenArray } from '../../../utils/array';
import { Topping } from '../../models/topping.model';
import * as fromActions from '../actions';

interface ToppingsEntities {
  [id: number]: Topping;
}

export interface ToppingsState {
  entities: ToppingsEntities;
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
  action: fromActions.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromActions.LOAD_TOPPINGS:
      return { ...state, loaded: false, loading: true };

    case fromActions.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = flattenArray(toppings, state.entities);
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromActions.LOAD_TOPPINGS_FAIL:
      return { ...state, loaded: false, loading: false };

    case fromActions.VISUALISE_TOPPINGS: {
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
 * shortcut functions
 */
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsAsArray = (entities: ToppingsEntities) => {
  return Object.keys(entities).map(id => entities[+id]);
};
export const getSelectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
