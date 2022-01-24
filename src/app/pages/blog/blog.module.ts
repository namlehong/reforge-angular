import { NgModule } from '@angular/core'
import { WordpressPostComponent } from './wordpress-post/wordpress-post.component'
import { WordpressPostsComponent } from './wordpress-posts/wordpress-posts.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared.module'

const routes: Routes = [
  {
    path: 'category/:categoryId',
    component: WordpressPostsComponent,
    data: { title: 'Blog' },
  },
  {
    path: 'post/:postId',
    component: WordpressPostComponent,
    data: { title: 'Blog' },
  },
]

@NgModule({
  declarations: [WordpressPostsComponent, WordpressPostComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
