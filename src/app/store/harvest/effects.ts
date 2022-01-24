import { Injectable } from '@angular/core'
import { UserServiceBetaService } from '../../core/services/user-service-beta.service'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import * as HarvestAction from './actions'
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../reducers'
import { WebsocketService } from '../../core/services/websocket.service'

@Injectable()
export class HarvestEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private betaService: UserServiceBetaService,
    private ws: WebsocketService,
  ) {}

  @Effect({ dispatch: false })
  loadBetaService: Observable<any> = this.actions.pipe(
    ofType(HarvestAction.ADD_SERVICE),
    map((action: any) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getLeagueId)))),
    ),
    tap(([service, league]) => {
      this.betaService.getWithQuery({ service, league })
    }),
  )

  @Effect({ dispatch: false })
  updateFilterService: Observable<any> = this.actions.pipe(
    ofType(HarvestAction.ADD_SERVICE, HarvestAction.REMOVE_SERVICE),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getHallBeta)))),
    ),
    tap(([, ids]) => {
      this.betaService.setFilter(ids)
    }),
  )

  @Effect({ dispatch: false })
  websocketSubscribe: Observable<any> = this.actions.pipe(
    ofType(HarvestAction.ADD_SERVICE),
    tap(action => {
      // disable
      // this.ws.wsSubject.next({subscribe: `poe_service__${action.payload}`})
    }),
  )

  @Effect({ dispatch: false })
  websocketUnsubscribe: Observable<any> = this.actions.pipe(
    ofType(HarvestAction.REMOVE_SERVICE),
    tap(action => {
      // disable
      // this.ws.wsSubject.next({unsubscribe: `poe_service__${action.payload}`})
    }),
  )
}
