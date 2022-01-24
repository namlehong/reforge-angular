import { Action } from '@ngrx/store'
import { UserService } from 'src/app/core/models'

export const CREATE_SERVICE = '[PoE Service] Create Service'
export const UPDATE_SERVICE = '[PoE Service] Update Service'
export const PARTIAL_UPDATE_SERVICE = '[PoE Service] Partial Update Service'
export const LOAD_PUBLIC_SERVICE = '[PoE Service] Load Public Service'
export const VOUCH_SERVICE = '[PoE Service] Vouch'
export const TOGGLE_AVAILABLE = '[PoE Service] Toggle'
export const PM = '[PoE Service] PM'
export const DISAPPROVE = '[PoE Service] Disapprove'
export const EDIT_SERVICE = '[Profile] Edit Service'
export const COPY_DISCORD_EXPORT = '[Profile] Copy to Discord'
export const UPDATE_HALL_FILTER = '[Hall] Update filter'
export const UPDATE_HALL_COUNTER = '[Hall] Update Counter'

export class CreateServiceAction implements Action {
  readonly type = CREATE_SERVICE

  constructor() {}
}

export class UpdateServiceAction implements Action {
  readonly type = UPDATE_SERVICE

  constructor(public payload: UserService) {}
}

export class PartialUpdateServiceAction implements Action {
  readonly type = PARTIAL_UPDATE_SERVICE

  constructor(public payload: object) {}
}

export class LoadPublicServiceAction implements Action {
  readonly type = LOAD_PUBLIC_SERVICE

  constructor(public payload: string) {}
}

export class VouchAction implements Action {
  readonly type = VOUCH_SERVICE

  constructor(public payload: UserService) {}
}

export class DisapproveAction implements Action {
  readonly type = DISAPPROVE

  constructor(public payload: UserService) {}
}

export class PMAction implements Action {
  readonly type = PM

  constructor(public payload: UserService) {}
}

export class ToggleAvailableAction implements Action {
  readonly type = TOGGLE_AVAILABLE

  constructor(public payload: { id: any; is_available: boolean }) {}
}

export class EditServiceAction implements Action {
  readonly type = EDIT_SERVICE

  constructor(public payload: UserService) {}
}

export class UpdateHallFilterAction implements Action {
  readonly type = UPDATE_HALL_FILTER

  constructor(public payload: any) {}
}
export class UpdateHallCounterAction implements Action {
  readonly type = UPDATE_HALL_COUNTER

  constructor(public payload: any) {}
}

export type Actions =
  | CreateServiceAction
  | UpdateServiceAction
  | PartialUpdateServiceAction
  | VouchAction
  | DisapproveAction
  | PMAction
  | ToggleAvailableAction
  | EditServiceAction
  | LoadPublicServiceAction
  | UpdateHallFilterAction
  | UpdateHallCounterAction
