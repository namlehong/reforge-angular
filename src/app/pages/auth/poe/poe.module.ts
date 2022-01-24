import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PoeComponent } from './poe.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: PoeComponent,
    data: { title: 'Login' },
  },
]

@NgModule({
  declarations: [PoeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PoeModule {}
