import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { UserService } from '../models'

@Injectable({
  providedIn: 'root',
})
export class MyServiceService extends EntityCollectionServiceBase<UserService> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('MyService', serviceElementsFactory)
  }
}
