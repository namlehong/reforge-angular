import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { HallService } from '../../../core/models'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../store/reducers'

@Component({
  selector: 'app-trading-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  hallServices$: Observable<HallService[]> = this.store.pipe(
    select(Reducers.getHallServiceWithPrice),
  )

  constructor(private store: Store<any>) {}

  ngOnInit(): void {}
}
