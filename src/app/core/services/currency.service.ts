import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { Currency } from '../models'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService extends EntityCollectionServiceBase<Currency> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Currency', serviceElementsFactory)
  }
}
