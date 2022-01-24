import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { UserService } from '../models'
import { ProfilesService } from './profiles.service'
import { filter, map, shareReplay, switchMap } from 'rxjs/operators'
import { AppSelectors } from '../../store/settings'
import { combineLatest } from 'rxjs'
import { CategoryService } from './category.service'
import { HallServiceService } from './hall-service.service'

@Injectable({
  providedIn: 'root',
})
export class UserServiceService extends EntityCollectionServiceBase<UserService> {
  profileServices$ = combineLatest([
    this.profileService.activeProfile$,
    this.appSelectors.league$,
  ]).pipe(
    filter(([profile, league]) => !!profile && !!league),
    switchMap(([profile, league]) =>
      this.getWithQuery({
        user: profile.id.toString(),
        league: league.id.toString(),
        is_active: 'True',
        limit: '999',
      }),
    ),
    shareReplay(1),
  )

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private profileService: ProfilesService,
    private categoryService: CategoryService,
    private hallService: HallServiceService,
    private appSelectors: AppSelectors,
  ) {
    super('UserService', serviceElementsFactory)
  }
}
