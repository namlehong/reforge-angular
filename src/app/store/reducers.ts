import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store'
import { environment } from 'src/environments/environment'
import * as fromRouter from '@ngrx/router-store'
import * as fromSettings from './settings/reducers'
import * as fromUser from './user/reducers'
import * as fromPoeService from './poe-services/reducers'
import * as fromHarvestBeta from './harvest/reducers'
import { localStorageSync } from 'ngrx-store-localstorage'
import { EntitySelectorsFactory } from '@ngrx/data'
import { Category, Currency, HallPrice, HallService, League, UserService } from '../core/models'
import { settings } from 'cluster'

export const reducers: ActionReducerMap<any> = {
  router: fromRouter.routerReducer,
  settings: fromSettings.reducer,
  user: fromUser.reducer,
  services: fromPoeService.reducer,
  harvest: fromHarvestBeta.reducer,
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    const result = reducer(state, action)
    console.groupCollapsed(action.type)
    console.log('prev state', state)
    console.log('action', action)
    console.log('next state', result)
    console.groupEnd()
    return result
  }
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['settings', 'user', 'entityCache'],
    storageKeySerializer: key => `cool_${key}`,
  })(reducer)
}

// export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger, localStorageSyncReducer] : [localStorageSyncReducer]
export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : []

export interface State {
  router: fromRouter.RouterReducerState<any>
}

export const leagueSelectors = new EntitySelectorsFactory().create<League>('League')
export const currencySelectors = new EntitySelectorsFactory().create<Currency>('Currency')
export const userServiceSelectors = new EntitySelectorsFactory().create<UserService>('UserService')
export const myServiceSelectors = new EntitySelectorsFactory().create<UserService>('MyService')
export const hallServiceSelectors = new EntitySelectorsFactory().create<HallService>('HallService')
export const hallPriceSelectors = new EntitySelectorsFactory().create<HallPrice>('HallPrice')
export const categorySelectors = new EntitySelectorsFactory().create<Category>('Category')

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>(
  'router',
)

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter)

export const getSettingsState = createFeatureSelector<any>('settings')
export const getSettings = createSelector(getSettingsState, fromSettings.getSettings)

export const getLeagueId = createSelector(getSettings, settings => settings.league_id)
export const getAutoPing = createSelector(getSettings, settings => settings.autoPing)

export const getLeague = createSelector(
  getLeagueId,
  leagueSelectors.selectEntityMap,
  (leagueId, _map) => _map[leagueId],
)

export const getActiveServiceType = createSelector(
  selectRouteParams,
  ({ serviceType }) => serviceType,
)
export const getActiveProfile = createSelector(selectRouteParams, ({ userId }) => userId)

export const getExRatio = createSelector(
  currencySelectors.selectEntities,
  getLeagueId,
  (entities, leagueId) => {
    try {
      return entities.filter(i => i.league === leagueId && i.name === 'Exalted Orb')[0]
        .chaos_equivalent
    } catch (e) {
      return 0
    }
  },
)

export const getHallPriceMap = createSelector(
  hallPriceSelectors.selectEntities,
  getLeagueId,
  (entities, leagueId) =>
    entities.filter(i => i.league === leagueId).reduce((a, b) => ({ ...a, [b.service]: b }), {}),
)

export const getHallServiceWithPrice = createSelector(
  hallServiceSelectors.selectFilteredEntities,
  categorySelectors.selectEntityMap,
  getHallPriceMap,
  (entities, categoryMap, priceMap) =>
    entities.map(i => ({
      ...i,
      categoryInfo: categoryMap[i.category],
      price: priceMap[i.id] || { average: 'n/a', median: 'n/a' },
    })),
)

//
export const getUserState = createFeatureSelector<any>('user')
export const getUser = createSelector(getUserState, fromUser.getUser)
export const getAuthorized = createSelector(getUserState, state => state.authorized)

export const getPoeProfile = createSelector(getUser, fromUser.getPoeProfile)

export const getServicesState = createFeatureSelector<any>('services')
export const getHallQuery = createSelector(
  getServicesState,
  getLeagueId,
  ({ count, ...filterData }, league) => ({ ...filterData, league }),
)

export const getMyServices = createSelector(
  myServiceSelectors.selectFilteredEntities,
  hallServiceSelectors.selectEntityMap,
  categorySelectors.selectEntityMap,
  getLeagueId,
  (entities, serviceMap, categoryMap, leagueId) =>
    entities
      .map(i => ({
        ...i,
        serviceInfo: serviceMap[i.service],
        categoryInfo: serviceMap[i.service]
          ? categoryMap[serviceMap[i.service].category]
          : ({} as Category),
      }))
      .filter(i => i.league === leagueId),
)

export const getUserServices = createSelector(
  userServiceSelectors.selectEntities,
  hallServiceSelectors.selectEntityMap,
  categorySelectors.selectEntityMap,
  (entities, serviceMap, categoryMap) =>
    entities.map(i => ({
      ...i,
      serviceInfo: serviceMap[i.service],
      categoryInfo: serviceMap[i.service]
        ? categoryMap[serviceMap[i.service].category]
        : ({} as Category),
    })),
)

export const getHallBetaState = createFeatureSelector<any>('harvest')
export const getHallBeta = createSelector(getHallBetaState, fromHarvestBeta.getHallBeta)
