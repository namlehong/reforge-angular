import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { from, Observable, of } from 'rxjs'
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import store from 'store'
import { NzNotificationService } from 'ng-zorro-antd'

import * as Reducers from 'src/app/store/reducers'
import * as UserActions from './actions'
import { UserService } from '../../core/services'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
    private notification: NzNotificationService,
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }

  @Effect()
  login: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGIN),
    map((action: UserActions.Login) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // django
      if (settings.authProvider === 'poe') {
        console.log('poe login 2')
        // window.open(environment.poe_oauth2_url, 'poe_login', 'height=600,width=500')
        // return EMPTY
        return this.userService.attemptPoeAuth('login', payload).pipe(
          tap(console.log),
          map(response => {
            if (response && response.token) {
              store.set('accessToken', response.token)
              this.notification.success('Logged In', 'You have successfully logged in!')
              return new UserActions.LoadCurrentAccount()
            }
            console.log('response', response)
            if (response['errors']) {
              this.notification.warning('Auth Failed', response['errors']['error'].join(' '))
            }
            return new UserActions.LoginUnsuccessful()
          }),
          catchError(error => {
            console.log('LOGIN ERROR: ', error)
            if (error['errors']) {
              this.notification.warning('Auth Failed', error['errors']['error'].join(' '))
            }
            return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
          }),
        )
      }

      return this.userService.attemptAuth('login', payload).pipe(
        tap(console.log),
        map(response => {
          if (response && response.token) {
            store.set('accessToken', response.token)
            this.notification.success('Logged In', 'You have successfully logged in!')
            return new UserActions.LoadCurrentAccount()
          }
          console.log('response', response)
          if (response['errors']) {
            this.notification.warning('Auth Failed', response['errors']['error'].join(' '))
          }
          return new UserActions.LoginUnsuccessful()
        }),
        catchError(error => {
          console.log('LOGIN ERROR: ', error)
          if (error['errors']) {
            this.notification.warning('Auth Failed', error['errors']['error'].join(' '))
          }
          return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  loadCurrentAccount: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT),
    map((action: UserActions.LoadCurrentAccount) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([action, settings]) => {
      return this.userService.me().pipe(
        map(response => {
          if (response && (response.email || response.username)) {
            if (this.route.snapshot.queryParams.returnUrl) {
              this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
            } else if (this.router.url.includes('login')) {
              this.router.navigate(['/']) // redirect to root route on auth pages
            }
            return new UserActions.LoadCurrentAccountSuccessful(response)
          }

          return new UserActions.LoadCurrentAccountUnsuccessful()
        }),
        catchError(error => {
          console.log('ACCOUNT LOAD ERROR: ', error)
          return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGOUT),
    map((action: UserActions.Logout) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    map(([, settings]) => {
      store.remove('accessToken')
      this.router.navigate(['login'])
      return new UserActions.FlushUser()
    }),
  )
}
