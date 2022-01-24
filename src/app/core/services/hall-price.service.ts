import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { HallPrice } from '../models'

@Injectable({
  providedIn: 'root',
})
export class HallPriceService extends EntityCollectionServiceBase<HallPrice> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('HallPrice', serviceElementsFactory)
  }
}
