import { Injectable } from '@angular/core'
import { webSocket } from 'rxjs/webSocket'
import { environment } from '../../../environments/environment'
import { delay, retryWhen, shareReplay, tap } from 'rxjs/operators'
import { AppSelectors } from '../../store/settings'

const retry = retryWhen(errors =>
  errors.pipe(
    tap(err => {
      console.error('Got error', err)
    }),
    delay(1000),
  ),
)

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  wsSubject = webSocket({
    url: environment.ws_url,
    closeObserver: {
      next(closeEvent) {
        const customError = { code: 6666, reason: 'Custom evil reason' }
        console.log(`code: ${customError.code}, reason: ${customError.reason}`)
      },
    },
    openObserver: {
      next: () => {
        console.log('connetion ok')
      },
    },
  })

  obj$ = this.wsSubject.pipe(retry, shareReplay(1))

  constructor(private appSelectors: AppSelectors) {
    // this.obj$.subscribe(data => console.log('ws', data))
    // this.appSelectors.user$.subscribe(user => {
    //   if (user.authorized) {
    //     this.subscribe(`profile__${user.profile.id}`)
    //   }
    // })
  }

  subscribe(subscribe: string) {
    this.wsSubject.next({ subscribe })
  }

  unsubscribe(unsubscribe: string) {
    this.wsSubject.next({ unsubscribe })
  }
}
