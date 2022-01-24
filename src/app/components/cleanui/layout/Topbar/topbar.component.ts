import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../store/reducers'
import { interval } from 'rxjs'
import { UserService } from '../../../../core/services'
import { filter, map, take } from 'rxjs/operators'

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  authorized: boolean

  autoPing: boolean = true
  lastPing: Date = null

  constructor(private store: Store<any>, private userService: UserService) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
    })

    interval(1000)
      .pipe(
        filter(() => !!this.lastPing),
        map(() => new Date().getTime() - this.lastPing.getTime()),
      )
      .subscribe(data => (this.autoPing = data > 15 * 60 * 1000))

    this.store.pipe(select(Reducers.getAutoPing)).subscribe(data => (this.autoPing = data))
  }

  newService() {
    this.store.dispatch({ type: '[TopBar] New Service' })
  }

  togglePing() {
    this.lastPing = new Date()
    this.userService
      .ping()
      .pipe(take(1))
      .subscribe()
    // this.store.dispatch(new fromSettings.SetStateAction({autoPing: !this.autoPing}))
  }
}
