import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '../../../core/models'

@Component({
  selector: 'app-approve-counter',
  templateUrl: './approve-counter.component.html',
  styleUrls: ['./approve-counter.component.scss'],
})
export class ApproveCounterComponent implements OnInit {
  @Input()
  approved: number = 0

  @Input()
  disapproved: number = 0

  @Input() profile: Profile

  constructor() {}

  ngOnInit(): void {}
}
