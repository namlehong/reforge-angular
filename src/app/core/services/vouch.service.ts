import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { Vouch } from '../models'
import { AppSelectors } from '../../store/settings'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { filter, map, shareReplay, switchMap } from 'rxjs/operators'
import { ProfilesService } from './profiles.service'

@Injectable({
  providedIn: 'root',
})
export class VouchService extends EntityCollectionServiceBase<Vouch> {
  profileReload$ = new BehaviorSubject('')

  profileVouches$ = combineLatest([this.profileReload$, this.profileService.activeProfile$]).pipe(
    map(([, profile]) => profile),
    filter(profile => !!profile),
    switchMap(profile =>
      this.getWithQuery({
        receiver: profile.id.toString(),
        // limit: '999'
      }),
    ),
    shareReplay(1),
  )

  myVouches$ = this.appSelectors.user$.pipe(
    filter(user => user.authorized),
    switchMap(user =>
      this.getWithQuery({
        receiver: user.id,
        // limit: '999'
      }),
    ),
    shareReplay(1),
  )

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private profileService: ProfilesService,
    private appSelectors: AppSelectors,
  ) {
    super('Vouch', serviceElementsFactory)
  }
}
