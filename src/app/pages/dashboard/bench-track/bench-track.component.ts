import { Component, OnInit } from '@angular/core'
import { BenchCraftService, UserService } from '../../../core/services'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../store/reducers'
import * as ModsActions from 'src/app/store/mods/actions'
import { UserSettings } from '../../../core/models'

@Component({
  selector: 'app-bench-track',
  templateUrl: './bench-track.component.html',
  styleUrls: ['./bench-track.component.scss'],
})
export class BenchTrackComponent implements OnInit {
  // benchCrafts: any[]
  // myCrafts: any[]

  listOfData: any[] = []
  displayData: any[] = []
  bordered = false
  loading = false
  sizeChanger = true
  pagination = true
  header = true
  title = true
  footer = true
  fixHeader = false
  size = 50
  expandable = true
  checkbox = true
  allChecked = false
  indeterminate = false
  simple = false
  noResult = false
  position = 'bottom'
  pageSize = 20
  sizeOptions = [50, 100]

  league: string
  settings: UserSettings
  checkMods: number[]

  constructor(
    private store: Store<any>,
    private userService: UserService,
    private benchCraftService: BenchCraftService,
  ) {
    this.store
      .pipe(select(Reducers.getCheckedBenchMods))
      .subscribe(data => (this.listOfData = data))
  }

  currentPageDataChange($event: any[]): void {
    this.displayData = $event
  }

  refreshStatus(item: any, ev): void {
    console.log('refreshStatus', ev)
    if (ev) {
      this.store.dispatch(new ModsActions.CheckModsAction(item.uid))
    } else {
      this.store.dispatch(new ModsActions.UncheckModsAction(item.uid))
    }
  }

  ngOnInit(): void {}
}
