import * as fromActions from '../../../../src/products/store/actions/pizzas.action';
import * as fromReducer from '../../../../src/products/store/reducers/pizzas.reducer';
import { Pizza } from '../../../../src/products/models/pizza.model';

describe('PizzasReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState); // same object
    });
  });

  describe('LOAD_PIZZAS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadPizzas();
      const state = fromReducer.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_PIZZAS_SUCCESS action', () => {
    it('should populate the toppings array', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };
      const { initialState } = fromReducer;
      const action = new fromActions.LoadPizzasSuccess(pizzas);
      const state = fromReducer.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_PIZZAS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadPizzasFail('');
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromReducer;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadPizzasFail('');
      const state = fromReducer.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_PIZZA_SUCCESS action', () => {
    it('should add the new pizza to the pizzas array', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];
      const newPizza: Pizza = {
        id: 3,
        name: 'Pizza #3',
        toppings: []
      };
      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };
      const { initialState } = fromReducer;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreatePizzaSuccess(newPizza);
      const state = fromReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newPizza });
    });
  });

  describe('UPDATE_PIZZA_SUCCESS action', () => {
    it('should update the pizza', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];
      const updatedPizza = {
        id: 2,
        name: 'Pizza #2',
        toppings: [{ id: 1, name: 'basil' }]
      };
      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };
      const { initialState } = fromReducer;
      const previousState = { ...initialState, entities };
      const action = new fromActions.UpdatePizzaSuccess(updatedPizza);
      const state = fromReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({ ...entities, 2: updatedPizza });
    });
  });

  describe('REMOVE_PIZZA_SUCCESS action', () => {
    it('should remove the pizza', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };
      const { initialState } = fromReducer;
      const previousState = { ...initialState, entities };
      const action = new fromActions.DeletePizzaSuccess(pizzas[0]);
      const state = fromReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: pizzas[1] });
    });
  });
});

describe('PizzasReducer Selectors', () => {
  describe('getPizzaEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: Pizza } = {
        1: { id: 1, name: 'Pizza #1', toppings: [] },
        2: { id: 2, name: 'Pizza #2', toppings: [] }
      };
      const { initialState } = fromReducer;
      const state = { ...initialState, entities };
      const slice = fromReducer.getPizzasEntities(state);

      expect(slice).toEqual(entities);
    });
  });

  describe('getPizzasLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromReducer;
      const state = { ...initialState, loading: true };
      const slice = fromReducer.getPizzasLoading(state);

      expect(slice).toEqual(true);
    });
  });

  describe('getPizzasLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromReducer;
      const state = { ...initialState, loaded: true };
      const slice = fromReducer.getPizzasLoaded(state);

      expect(slice).toEqual(true);
    });
  });
});
