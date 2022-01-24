import { Injectable } from '@angular/core'
import { EntityServicesBase, EntityServicesElements } from '@ngrx/data'
import {
  LeagueService,
  CategoryService,
  HallServiceService,
  ProfilesService,
  UserService,
  WpPostService,
  WpCategoryService,
} from '../../core/services'
import { UserServiceService } from '../../core/services/user-service.service'
import { MyServiceService } from '../../core/services/my-service.service'
import { CurrencyService } from '../../core/services/currency.service'
import { HallPriceService } from '../../core/services/hall-price.service'
import { VouchService } from '../../core/services/vouch.service'
import { UserServiceBetaService } from '../../core/services/user-service-beta.service'
import { WebsocketService } from '../../core/services/websocket.service'
import { filter, tap } from 'rxjs/operators'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable()
export class AppEntityServices extends EntityServicesBase {
  constructor(
    entityServicesElements: EntityServicesElements,
    // Inject custom services, register them with the EntityServices, and expose in API.
    public readonly leagueService: LeagueService,
    public readonly currencyService: CurrencyService,
    public readonly categoryService: CategoryService,
    public readonly hallService: HallServiceService,
    public readonly hallPriceService: HallPriceService,
    public readonly userService: UserServiceService,
    public readonly myService: MyServiceService,
    public readonly profileService: ProfilesService,
    public readonly vouchService: VouchService,
    public readonly user: UserService,
    public readonly betaService: UserServiceBetaService,
    public readonly wpPost: WpPostService,
    public readonly wpCategory: WpCategoryService,
    public readonly ws: WebsocketService,
    private readonly notification: NzNotificationService,
  ) {
    super(entityServicesElements)
    this.registerEntityCollectionServices([
      leagueService,
      categoryService,
      hallService,
      hallPriceService,
      userService,
      profileService,
      myService,
      currencyService,
      vouchService,
      wpPost,
      wpCategory,
      betaService,
    ])

    leagueService.getAll()
    currencyService.getAll()
    categoryService.getAll()
    hallService.getAll()
    hallPriceService.getAll()

    wpCategory.getAll()

    profileService.fetchProfileOnRouteChange.subscribe()

    // user.pingEach5Min$.subscribe()

    // FIXME
    // ws.obj$.pipe(tap((data: any) => {
    //   if (data.type === 'vouch_update') {
    //     this.notification.success('Vouch Update', 'Your vouch has been changed')
    //     const audio = new Audio('/assets/sounds/percussion-sound-614.mp3')
    //     audio.play()
    //     this.store.dispatch({type: '[User] Update Profile', payload: data.profile})
    //   }
    // })).subscribe()

    // ws.obj$.pipe(
    //   filter((data: any) => data.type === 'service_update')
    // ).subscribe((data: any) => betaService.getByKey(data.id))
    // ws.objA.subscribe(console.log)
  }

  // ... Additional convenience members
}
