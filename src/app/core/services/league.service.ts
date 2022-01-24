import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { League } from '../models'

@Injectable({ providedIn: 'root' })
export class LeagueService extends EntityCollectionServiceBase<League> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('League', serviceElementsFactory)
  }
}
