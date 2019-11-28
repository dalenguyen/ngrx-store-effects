import * as fromPizzas from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [
    {
      name: "Seaside Surfin'",
      toppings: [
        {
          id: 6,
          name: "mushroom"
        },
        {
          id: 7,
          name: "olive"
        },
        {
          id: 2,
          name: "bacon"
        },
        {
          id: 3,
          name: "basil"
        },
        {
          id: 1,
          name: "anchovy"
        },
        {
          id: 9,
          name: "pepper"
        },
        {
          id: 5,
          name: "mozzarella"
        }
      ],
      id: 2
    }
  ],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }
  return state;
}

export const getPizzasLoading = (state: PizzaState): boolean => state.loading
export const getPizzasLoaded = (state: PizzaState): boolean => state.loaded
export const getPizzas = (state: PizzaState): Pizza[] => state.data
