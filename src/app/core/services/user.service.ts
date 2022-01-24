import { Injectable } from '@angular/core'
import { EMPTY, empty, interval, Observable } from 'rxjs'

import { ApiService } from './api.service'
import { User } from '../models'
import { catchError, filter, map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators'
import { AppSelectors } from '../../store/settings'

@Injectable()
export class UserService {
  // pingEach5Min$ = interval(2 * 5 * 60 * 1000).pipe(
  //   withLatestFrom(this.appSelectors.autoPing$, this.appSelectors.authorized$),
  //   filter(([, isAutoPing, authorized]) => !!isAutoPing && !!authorized),
  //   switchMap(() => {
  //     return this.ping().pipe(catchError(err => {
  //       return EMPTY
  //     }))
  //   }),
  //   shareReplay(1)
  // )

  constructor(
    private apiService: ApiService, // private appSelectors: AppSelectors
  ) {
    // somethine here
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : ''
    return this.apiService.post('/users' + route, { user: credentials }).pipe(map(res => res.user))
  }

  attemptPoeAuth(type, credentials): Observable<User> {
    console.log('attemptPoeAuth', type, credentials)
    const route = type === 'login' ? '/poe-login' : ''
    return this.apiService.post('/users' + route, { user: credentials }).pipe(map(res => res.user))
  }

  me(): Observable<User> {
    return this.apiService.get('/user').pipe(map(res => res.user))
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(map(data => data.user))
  }

  // partial update
  partial(data): Observable<any> {
    return this.apiService.patch('/user', { user: data }).pipe(map(data => data.user))
  }

  ping(): Observable<any> {
    return this.apiService.post('/ping', { v: '2' })
  }
}
