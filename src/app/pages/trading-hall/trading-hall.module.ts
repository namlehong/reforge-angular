import { NgModule } from '@angular/core'
import { TradingHallMainComponent } from './trading-hall-main/trading-hall-main.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PublicProfileComponent } from './public-profile/public-profile.component'
import { ReforgeWidgetsModule } from '../../components/reforge-widgets/reforge-widgets.module'
import { MenuComponent } from './menu/menu.component'
import { CommonModule } from '@angular/common'
import { HarvestComponent } from './harvest/harvest.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'harvest',
    pathMatch: 'full',
  },
  {
    path: 'profile/:userId',
    component: PublicProfileComponent,
    data: { title: 'Bench Craft' },
  },
  {
    path: 'harvest',
    component: HarvestComponent,
    data: { title: 'Harvest Craft', category: 3 },
  },
  {
    path: 'general',
    component: HarvestComponent,
    data: { title: 'General Service', category: 1 },
  },
  {
    path: 'carry',
    component: HarvestComponent,
    data: { title: 'Boss Carry', category: 4 },
  },
  {
    path: ':serviceType',
    component: HarvestComponent,
    data: { title: 'Harvest Craft', category: 3 },
  },
]

@NgModule({
  declarations: [TradingHallMainComponent, PublicProfileComponent, MenuComponent, HarvestComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ReforgeWidgetsModule,
  ],
})
export class TradingHallModule {}
