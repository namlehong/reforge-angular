import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { distinctUntilChanged } from 'rxjs/operators'

import * as Reducers from '../reducers'

@Injectable()
export class AppSelectors {
  constructor(private store: Store<any>) {}

  get settings$() {
    return this.store.select(Reducers.getSettings).pipe(distinctUntilChanged())
  }

  get league$() {
    return this.store.select(Reducers.getLeague).pipe(distinctUntilChanged())
  }

  get profile$() {
    return this.store.select(Reducers.getActiveProfile).pipe(distinctUntilChanged())
  }

  get autoPing$() {
    return this.store.select(Reducers.getAutoPing).pipe(distinctUntilChanged())
  }

  get authorized$() {
    return this.store.select(Reducers.getAuthorized).pipe(distinctUntilChanged())
  }

  get user$() {
    return this.store.select(Reducers.getUser).pipe(distinctUntilChanged())
  }
}
