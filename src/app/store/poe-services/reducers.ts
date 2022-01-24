import * as PoeServiceActions from './actions'

export const initialState: {
  count: number
  offset: number
  limit: number
  min_item_level: string
  service: string
  ordering: string
} = {
  count: 20,
  offset: 0,
  limit: 20,
  min_item_level: '76',
  service: '',
  ordering: 'chaos_equivalent',
}

export function reducer(state = initialState, action: PoeServiceActions.Actions): object {
  switch (action.type) {
    case PoeServiceActions.UPDATE_HALL_FILTER:
    case PoeServiceActions.UPDATE_HALL_COUNTER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
