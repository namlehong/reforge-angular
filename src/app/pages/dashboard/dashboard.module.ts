import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// import { BenchTrackComponent } from './bench-track/bench-track.component'
import { SharedModule } from '../../shared.module'
import { ProfileComponent } from './profile/profile.component'
import { FormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SortablejsModule } from 'ngx-sortablejs'
import { NestableModule } from 'ngx-nestable'
import { ReforgeWidgetsModule } from '../../components/reforge-widgets/reforge-widgets.module'

const routes: Routes = [
  // {
  //   path: 'bench',
  //   component: BenchTrackComponent,
  //   data: { title: 'Bench Craft' },
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'My Profile' },
  },
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule,
    ReforgeWidgetsModule,
    SortablejsModule,
    NestableModule,
  ],
})
export class DashboardModule {}
