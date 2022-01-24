import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { UpdateSsidFormComponent } from '../update-ssid-form/update-ssid-form.component'
import { UserService } from '../../../core/services'
import { tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as UserActions from '../../../store/user/actions'

@Component({
  selector: 'app-update-ssid-button',
  templateUrl: './update-ssid-button.component.html',
  styleUrls: ['./update-ssid-button.component.scss'],
})
export class UpdateSsidButtonComponent implements OnInit {
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private userService: UserService,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {}

  openModal() {
    const modal = this.modal.create({
      nzTitle: `Update PoE SSID`,
      nzContent: UpdateSsidFormComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        // serviceType: serviceType,
        // title: 'title in component',
        // subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'Close',
          onClick: componentInstance => {
            // componentInstance!.title = 'title in inner component is changed'
            // console.log(componentInstance.testForm.value)
            modal.close()
          },
        },
        {
          label: 'Submit',
          type: 'primary',
          onClick: componentInstance => {
            return this.userService
              .partial({ session_id: componentInstance.session_id })
              .pipe(
                tap(data =>
                  this.store.dispatch(new UserActions.LoadCurrentAccountSuccessful(data)),
                ),
              )
              .toPromise()
              .then(() => modal.close())
          },
        },
      ],
    })
  }
}
