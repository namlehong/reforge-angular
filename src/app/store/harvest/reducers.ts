import * as actions from './actions'

export const initialState: number[] = []

export function reducer(state = initialState, action: any): object {
  switch (action.type) {
    case actions.ADD_SERVICE:
      return [...state, action.payload]
    case actions.REMOVE_SERVICE:
      return state.filter(i => i !== action.payload)
    default:
      return state
  }
}

export const getHallBeta = (state: any) => state
