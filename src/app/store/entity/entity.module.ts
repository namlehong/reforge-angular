import { NgModule } from '@angular/core'
import {
  DefaultDataServiceConfig,
  DefaultDataServiceFactory,
  EntityDataModule,
  EntityDataService,
  HttpUrlGenerator,
} from '@ngrx/data'
import { entityConfig } from './entity-metadata'
import { MyHttpUrlGenerator } from './http-url-generator'
import { environment } from '../../../environments/environment'
import { AppEntityServices } from './entity-services'
import { UserDataService } from './user-data-service'
import { AppDataServiceFactory } from './app-data-service-factory'
import { VouchDataService } from './vouch-data-service'

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.api_url, // or a running server url, e.g: 'http://localhost:4000/api'
  entityHttpResourceUrls: {
    Vouch: {
      entityResourceUrl: `${environment.api_url}/vouches/`,
      collectionResourceUrl: `${environment.api_url}/vouches/`,
    },
    HallService: {
      entityResourceUrl: `${environment.api_url}/hall-services/`,
      collectionResourceUrl: `${environment.api_url}/hall-services/`,
    },
    HallPrice: {
      entityResourceUrl: `${environment.api_url}/hall-prices/`,
      collectionResourceUrl: `${environment.api_url}/hall-prices/`,
    },
    UserService: {
      entityResourceUrl: `${environment.api_url}/user-services/`,
      collectionResourceUrl: `${environment.api_url}/user-services/`,
    },
    UserServiceBeta: {
      entityResourceUrl: `${environment.api_url}/user-services-2/`,
      collectionResourceUrl: `${environment.api_url}/user-services-2/`,
    },
    MyService: {
      entityResourceUrl: `${environment.api_url}/my-services/`,
      collectionResourceUrl: `${environment.api_url}/my-services/`,
    },
    WpCategory: {
      entityResourceUrl: 'https://blog.poe.dev/wp-json/wp/v2/categories',
      collectionResourceUrl: 'https://blog.poe.dev/wp-json/wp/v2/categories',
    },
    WpPost: {
      entityResourceUrl: 'https://blog.poe.dev/wp-json/wp/v2/posts/',
      collectionResourceUrl: 'https://blog.poe.dev/wp-json/wp/v2/posts',
    },
  },
  timeout: 3000, // request timeout
}

@NgModule({
  declarations: [],
  imports: [EntityDataModule.forRoot(entityConfig)],
  providers: [
    AppEntityServices,
    { provide: HttpUrlGenerator, useClass: MyHttpUrlGenerator },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: DefaultDataServiceFactory, useClass: AppDataServiceFactory },
    UserDataService,
    VouchDataService,
  ],
})
export class EntityModule {
  constructor(
    entityDataService: EntityDataService,
    userDataService: UserDataService,
    vouchDataService: VouchDataService,
  ) {
    entityDataService.registerService('UserService', userDataService)
    entityDataService.registerService('Vouch', vouchDataService)
  }
}
