import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { metaReducers, reducers } from './reducers'
import { UserEffects } from './user/effects'
import { PoeServicesEffects } from './poe-services/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { EntityModule } from './entity/entity.module'
import { appSettingsServices } from './settings'
import { HarvestEffects } from './harvest/effects'

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects, PoeServicesEffects, HarvestEffects]),
    StoreRouterConnectingModule.forRoot(),
    EntityModule,
  ],
  providers: [appSettingsServices],
})
export class AppStoreModule {}
