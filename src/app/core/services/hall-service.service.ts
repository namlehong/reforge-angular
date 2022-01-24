import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { HallService } from '../models'
import { CategoryService } from './category.service'
import { combineLatest, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class HallServiceService extends EntityCollectionServiceBase<HallService> {
  filteredOptionsEntities$: Observable<{ value; label }[]> = combineLatest([
    this.categoryService.entityMap$,
    this.filteredEntities$,
  ]).pipe(
    map(([categories, entities]) => {
      return entities.map(i => ({
        value: i.id,
        label: `[${categories[i.category] ? categories[i.category].title : ''}] ${i.title}`,
      }))
    }),
    shareReplay(1),
  )

  filteredActiveEntities$ = this.filteredEntities$.pipe(
    map(items => items.filter(i => !!i.is_active)),
    shareReplay(1),
  )

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private categoryService: CategoryService,
  ) {
    super('HallService', serviceElementsFactory)
  }
}
