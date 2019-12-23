import { Injectable } from "@angular/core";

import { of } from "rxjs/observable/of";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";

import * as pizzaActions from "../actions";
import * as fromService from "../../services";

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
      );
    })
  );
}
