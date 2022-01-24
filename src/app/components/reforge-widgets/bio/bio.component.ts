import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '../../../core/models'

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent implements OnInit {
  @Input() poe: any = {}
  @Input() username: string
  @Input() profile: Profile
  @Input() isPublic: boolean = false

  constructor() {}

  ngOnInit(): void {}
}
