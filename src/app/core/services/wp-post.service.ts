import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { WpPost } from '../models'

@Injectable({
  providedIn: 'root',
})
export class WpPostService extends EntityCollectionServiceBase<WpPost> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('WpPost', serviceElementsFactory)
  }
}
