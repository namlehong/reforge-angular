import { Injectable } from '@angular/core'
import { Profile } from '../models'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { AppSelectors } from '../../store/settings'
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators'

@Injectable()
export class ProfilesService extends EntityCollectionServiceBase<Profile> {
  activeProfile$ = this.appSelectors.profile$.pipe(
    filter(i => !!i),
    switchMap(username => this.entityMap$.pipe(map(data => data[username]))),
    shareReplay(1),
  )

  fetchProfileOnRouteChange = this.appSelectors.profile$.pipe(
    filter(i => !!i),
    tap(username => this.getByKey(username)),
    shareReplay(1),
  )

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private appSelectors: AppSelectors,
  ) {
    super('Profile', serviceElementsFactory)
  }
}
