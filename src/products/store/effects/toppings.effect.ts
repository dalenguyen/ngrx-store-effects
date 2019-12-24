import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as toppingsAction from '../actions/toppings.action'
import * as fromService from '../../services/toppings.service'

@Injectable()
export class ToppingsEffects {
  constructor(
    private action$: Actions,
    private toppingsService: fromService.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.action$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsAction.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsAction.LoadToppingsFail(error)))
      )
    })
  )
}