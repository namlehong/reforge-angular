import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BioComponent } from './bio/bio.component'
import { ListServicesComponent } from './list-services/list-services.component'
import { NewServiceComponent } from './new-service/new-service.component'
import { SharedModule } from '../../shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { ApproveCounterComponent } from './approve-counter/approve-counter.component'
import { ApproveHistoryComponent } from './approve-history/approve-history.component'
import { UpdateSsidButtonComponent } from './update-ssid-button/update-ssid-button.component'
import { UpdateSsidFormComponent } from './update-ssid-form/update-ssid-form.component'
import { DisapproveFormComponent } from './disapprove-form/disapprove-form.component'
import { ExportTextComponent } from './export-text/export-text.component'
import { HarvestFilterComponent } from './harvest-filter/harvest-filter.component'

const COMPONENTS = [
  BioComponent,
  ListServicesComponent,
  NewServiceComponent,
  ApproveCounterComponent,
  ApproveHistoryComponent,
  UpdateSsidButtonComponent,
  UpdateSsidFormComponent,
  DisapproveFormComponent,
  ExportTextComponent,
  HarvestFilterComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ReforgeWidgetsModule {}
