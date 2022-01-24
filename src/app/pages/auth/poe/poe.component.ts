import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import store from 'store'

@Component({
  selector: 'app-poe',
  templateUrl: './poe.component.html',
  styleUrls: ['./poe.component.scss'],
})
export class PoeComponent implements OnInit {
  code: string

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(params => {
      this.code = params.get('code')
      // window.localStorage;
      store.set('app.poe.auth', this.code)
      localStorage.setItem('app.poe.auth', this.code)
      // window.close()
    })
  }
}
