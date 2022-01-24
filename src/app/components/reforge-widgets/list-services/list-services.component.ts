import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { HallService, UserService } from '../../../core/models'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { Dictionary } from '@ngrx/entity'

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit, OnChanges {
  title: string = 'Service'

  @Input()
  services: UserService[]

  @Input()
  hallMap: Dictionary<HallService>

  @Input()
  isPublic: boolean = false

  @Output() edit: EventEmitter<any> = new EventEmitter<any>()
  @Output() pm: EventEmitter<any> = new EventEmitter<any>()
  @Output() vouch: EventEmitter<any> = new EventEmitter<any>()
  @Output() disapprove: EventEmitter<any> = new EventEmitter<any>()
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>()
  @Output() discordExport: EventEmitter<any> = new EventEmitter<any>()

  data = []
  serviceTypeMap: any[] = []

  activeKey = 0

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const { services } = changes
  }

  changeKey(key) {
    this.activeKey = key
  }

  doDisapprove(item) {
    this.disapprove.emit({ ...item, serviceInfo: this.hallMap[item.service] })
  }
}
