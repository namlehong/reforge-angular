import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as ServiceActions from '../../../store/poe-services/actions'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { HallService, Profile, UserService } from '../../../core/models'
import { Dictionary } from '@ngrx/entity'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  user$: Observable<Profile> = this.appEntityServices.profileService.activeProfile$
  listService$: Observable<UserService[]> = this.appEntityServices.userService.profileServices$
  hallMap: Dictionary<HallService>
  hallMap$: Observable<
    Dictionary<HallService>
  > = this.appEntityServices.hallService.entityMap$.pipe(tap(data => (this.hallMap = data)))
  vouches$ = this.appEntityServices.vouchService.profileVouches$

  constructor(private store: Store<any>, private appEntityServices: AppEntityServices) {}

  ngOnInit(): void {}

  pm(item) {
    this.store.dispatch(
      new ServiceActions.PMAction({ ...item, serviceInfo: this.hallMap[item.service] }),
    )
  }

  vouch(item) {
    // this.store.dispatch(new ServiceActions.VouchAction(item))
    this.appEntityServices.vouchService.add({ service: item.id, karma: 1 })
  }

  disapprove(item) {
    this.store.dispatch(new ServiceActions.DisapproveAction(item))
    // this.appEntityServices.vouchService.add({service: item.id, karma: -1})
  }
}
