import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-update-ssid-form',
  templateUrl: './update-ssid-form.component.html',
  styleUrls: ['./update-ssid-form.component.scss'],
})
export class UpdateSsidFormComponent implements OnInit {
  session_id: string = ''

  constructor() {}

  ngOnInit(): void {}
}
