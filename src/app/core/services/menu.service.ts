import { Injectable } from '@angular/core'
import { combineLatest, Observable, of } from 'rxjs'
import { getMenuData } from '../data/menu.data'
import { WpCategoryService } from './wp-category.service'
import { map, shareReplay } from 'rxjs/operators'
import { WpCategory } from '../models'

const mapWpCategory2Menu = (i: WpCategory) => ({
  title: i.name,
  key: i.slug,
  url: `/blog/category/${i.id}`,
  icon: 'fe fe-database',
})

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuData$ = combineLatest([of(getMenuData), this.wpCategoryService.entities$])
    .pipe(
      map(([menu, wpCategories]) => {
        const blogMenu = wpCategories.filter(i => i.count > 0).map(mapWpCategory2Menu)
        return [
          ...menu,
          {
            category: true,
            title: 'Dev Blog',
          },
          ...blogMenu,
        ]
      }),
    )
    .pipe(shareReplay(1))

  constructor(private wpCategoryService: WpCategoryService) {}

  getMenuData(): Observable<any[]> {
    return of(getMenuData)
  }
}
