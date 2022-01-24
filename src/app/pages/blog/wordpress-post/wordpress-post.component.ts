import { Component, OnInit } from '@angular/core'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable } from 'rxjs'
import { WpPost } from '../../../core/models'
import { map, shareReplay, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-wordpress-post',
  templateUrl: './wordpress-post.component.html',
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
export class WordpressPostComponent implements OnInit {
  postId$ = this.activatedRoute.paramMap.pipe(map(i => i.get('postId')))

  post$: Observable<WpPost> = combineLatest([
    this.appEntityServices.wpPost.entityMap$,
    this.postId$,
  ])
    .pipe(
      map(([postMap, postId]) => {
        if (!postMap[postId]) {
          this.appEntityServices.wpPost.getByKey(postId)
        }

        return postMap[postId]
      }),
    )
    .pipe(shareReplay(1))

  loading$ = this.appEntityServices.wpPost.loading$

  constructor(
    private appEntityServices: AppEntityServices,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.postId$.subscribe(postId => this.appEntityServices.wpPost.getByKey(postId))
  }

  ngOnInit() {}
}
