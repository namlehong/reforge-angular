import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../store/reducers'
import * as PoeServiceActions from '../../../store/poe-services/actions'
import * as ServiceActions from 'src/app/store/poe-services/actions'
import { Observable } from 'rxjs'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { map, shareReplay, tap } from 'rxjs/operators'
import { HallService, User, UserService } from '../../../core/models'
import { Dictionary } from '@ngrx/entity'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User
  user$ = this.store.pipe(select(Reducers.getUser))
  hasLinked$: Observable<boolean> = this.user$.pipe(
    map(data => data && data.profile && data.profile.name),
  )
  myServices$: Observable<UserService[]> = this.store.pipe(
    select(Reducers.getMyServices),
    map(items => items.filter(i => i.is_active)),
    shareReplay(1),
  )
  hallMap$: Observable<Dictionary<HallService>> = this.appEntityServices.hallService.entityMap$
  vouches$ = this.appEntityServices.vouchService.myVouches$

  constructor(private store: Store<any>, private appEntityServices: AppEntityServices) {
    this.user$.subscribe(data => {
      console.log('user', data)
      this.user = data
    })
  }

  ngOnInit(): void {
    this.appEntityServices.myService.getAll()
  }

  toggleAvailable([item, ev]) {
    this.appEntityServices.myService.update({ ...item, is_active: ev })
  }

  edit(item) {
    this.store.dispatch(new ServiceActions.EditServiceAction(item))
  }

  export(items: object[]) {
    this.store.dispatch({ type: PoeServiceActions.COPY_DISCORD_EXPORT, payload: items })
  }
}
