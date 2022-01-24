import { Action } from '@ngrx/store'

export const SET_STATE = '[Settings] Set State'
export const CHANGE_SETTING = '[Settings] Change Setting'
export const SET_LEAGUE = '[League Switcher] Change league'

export class SetStateAction implements Action {
  readonly type = SET_STATE

  constructor(public payload: object) {}
}

export class ChangeSettingAction implements Action {
  readonly type = CHANGE_SETTING
  constructor(public payload: object) {}
}

export class SetLeagueAction implements Action {
  readonly type = SET_LEAGUE

  constructor(public payload: object) {}
}

export type Actions = SetStateAction | ChangeSettingAction | SetLeagueAction
