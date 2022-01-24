import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { UserService } from '../models'

@Injectable({
  providedIn: 'root',
})
export class UserServiceBetaService extends EntityCollectionServiceBase<UserService> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserServiceBeta', serviceElementsFactory)
  }
}
