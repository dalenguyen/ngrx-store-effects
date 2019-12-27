import { Injectable } from '@angular/core'

import { of } from 'rxjs/observable/of'
import { Actions, Effect } from '@ngrx/effects'
import { switchMap, map, catchError } from 'rxjs/operators'

import * as pizzaActions from '../actions'
import * as fromService from '../../services'

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromService.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      )
    })
  )

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.createPizza(pizza).pipe(
        map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
      )
    })
  )

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(pizza => new pizzaActions.UpdatePizzaSucess(pizza)),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      )
    })
  )

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzaActions.DELETE_PIZZA).pipe(
    map((action: pizzaActions.DeletePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
      )
    })
  )
}
