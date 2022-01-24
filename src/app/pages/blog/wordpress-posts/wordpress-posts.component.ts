import { Component, OnInit } from '@angular/core'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { ActivatedRoute } from '@angular/router'
import { map, shareReplay, switchMap } from 'rxjs/operators'
import { combineLatest, Observable } from 'rxjs'
import { WpPost } from '../../../core/models'

@Component({
  selector: 'app-wordpress-posts',
  templateUrl: './wordpress-posts.component.html',
  styles: [
    `
      .example {
        text-align: center;
        /*background: rgba(0, 0, 0, 0.05);*/
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 30px 50px;
        margin: 20px 0;
      }
    `,
  ],
})
export class WordpressPostsComponent implements OnInit {
  categoryId$ = this.activatedRoute.paramMap.pipe(map(i => i.get('categoryId')))
  posts$: Observable<WpPost[]> = combineLatest([
    this.appEntityServices.wpPost.entities$,
    this.categoryId$,
  ])
    .pipe(
      map(([posts, categoryId]) =>
        posts.filter(i => i.categories.includes(parseInt(categoryId, 10))),
      ),
    )
    .pipe(shareReplay(1))

  loading$ = this.appEntityServices.wpPost.loading$

  constructor(
    private appEntityServices: AppEntityServices,
    private activatedRoute: ActivatedRoute,
  ) {
    this.categoryId$.subscribe(categories =>
      this.appEntityServices.wpPost.getWithQuery({ categories }),
    )
  }

  ngOnInit() {}
}
