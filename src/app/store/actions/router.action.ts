import { Action } from '@ngrx/store'
import { NavigationExtras, Params } from '@angular/router'

export const GO = '[ROUTER] Go'
export const BACK = '[ROUTER] Back'
export const FORWARD = '[ROUTER] Forward'

export class Go implements Action {
  readonly type = GO
  constructor(
    public payload: {
      path: any[]
      query?: Params
      extras?: NavigationExtras
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK
}

export class Forward implements Action {
  readonly type = FORWARD
}

export type Actions = Go | Back | Forward
