import * as fromPizzas from '../actions/pizzas.action'
import { Pizza } from '../../models/pizza.model'

export interface PizzaState {
  entities: { [id: number]: Pizza }
  loaded: boolean
  loading: boolean
}

export type PizzaEntities = Pick<PizzaState, 'entities'>

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
}

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    // Load pizza
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          }
        },
        {
          ...state.entities
        }
      )

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      }
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      }
    }

    // Create pizza
    case fromPizzas.CREATE_PIZZA_SUCCESS:
    // Update pizza
    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      const pizza: Pizza = action.payload
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      }
      return {
        ...state,
        entities
      }
    }

    // Delete pizza
    case fromPizzas.DELETE_PIZZA_SUCCESS: {
      const pizza: Pizza = action.payload
      const { [pizza.id]: removed, ...entities } = state.entities

      return {
        ...state,
        entities
      }
    }
  }
  return state
}

export const getPizzasLoading = (state: PizzaState): boolean => state.loading
export const getPizzasLoaded = (state: PizzaState): boolean => state.loaded
export const getPizzasEntities = (state: PizzaState): any => state.entities
