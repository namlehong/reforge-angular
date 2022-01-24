import { Component, Input, OnInit } from '@angular/core'
import { Vouch } from '../../../core/models'

@Component({
  selector: 'app-approve-history',
  templateUrl: './approve-history.component.html',
  styleUrls: ['./approve-history.component.scss'],
})
export class ApproveHistoryComponent implements OnInit {
  @Input() vouches: Vouch[]

  constructor() {}

  ngOnInit(): void {}
}
