import {
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction
} from '../actions/pizzas.action';
import { InitialState } from '@ngrx/store/src/models';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
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
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
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

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
