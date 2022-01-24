import { Component, Input, OnInit } from '@angular/core'
import { UserService } from '../../../core/models'
import { FormBuilder, Validators } from '@angular/forms'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { NzDrawerRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-disapprove-form',
  templateUrl: './disapprove-form.component.html',
  styleUrls: ['./disapprove-form.component.scss'],
})
export class DisapproveFormComponent implements OnInit {
  @Input() item: UserService

  form = this.fb.group({
    note: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private appEntityServices: AppEntityServices,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.appEntityServices.vouchService.add({
        service: this.item.id,
        karma: -1,
        ...this.form.value,
      })
      this.drawerRef.close()
    }
  }
}
