import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { WpCategory } from '../models'

@Injectable({
  providedIn: 'root',
})
export class WpCategoryService extends EntityCollectionServiceBase<WpCategory> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('WpCategory', serviceElementsFactory)
  }
}
