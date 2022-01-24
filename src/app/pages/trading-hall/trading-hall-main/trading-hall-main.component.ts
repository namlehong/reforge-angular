import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs'
import { FormBuilder, FormControl } from '@angular/forms'
import * as ServiceActions from 'src/app/store/poe-services/actions'
import * as Reducers from 'src/app/store/reducers'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { Dictionary } from '@ngrx/entity'
import { HallService } from '../../../core/models/hall-service.model'
import { NzDrawerService } from 'ng-zorro-antd'
import { UserService } from '../../../core/models'

@Component({
  selector: 'app-trading-hall-main',
  templateUrl: './trading-hall-main.component.html',
  styleUrls: ['./trading-hall-main.component.scss'],
})
export class TradingHallMainComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject()

  league: string
  itemList: UserService[] = []
  listOfSelectedValue = []
  itemLevelControl: FormControl

  pagingIndex: number
  pagingSize: number
  pagingTotal: number
  ordering = []

  searchChange$ = new BehaviorSubject('')

  hallServices$ = this.appEntityServices.hallService.filteredOptionsEntities$

  hallServiceMap: Dictionary<HallService>

  authorized = false

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private appEntityServices: AppEntityServices,
    private drawerService: NzDrawerService,
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
    })
    this.appEntityServices.hallService.entityMap$.subscribe(data => (this.hallServiceMap = data))
    // search bar
    this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(pattern => this.appEntityServices.hallService.setFilter(pattern))

    // item level input
    this.itemLevelControl = this.fb.control(76)

    this.itemLevelControl.valueChanges.pipe(debounceTime(500)).subscribe(min_item_level =>
      this.store.dispatch({
        type: '[Hall] Update filter',
        payload: { min_item_level },
      }),
    )

    // update paging
    this.store
      .pipe(select(Reducers.getServicesState))
      .pipe(
        tap(data => {
          this.pagingIndex = data.offset / data.limit + 1
          this.pagingSize = data.limit
          this.pagingTotal = data.count
          this.listOfSelectedValue = data.service
          this.itemLevelControl.patchValue(data.min_item_level, { emitEvent: false })
        }),
      )
      .subscribe()

    // update data
    this.store.pipe(select(Reducers.getUserServices)).subscribe(data => (this.itemList = data))

    this.store
      .pipe(
        select(Reducers.getHallQuery),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        // take(1),
      )
      .subscribe(filterData => {
        // console.log('filterData', filterData)
        this.appEntityServices.userService.clearCache()
        this.appEntityServices.userService.getWithQuery(filterData)
      })
  }

  refresh() {
    this.store.dispatch(new ServiceActions.UpdateHallFilterAction({ _: new Date().toISOString() }))
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  onSearch(ev) {
    this.searchChange$.next(ev.toLowerCase())
  }

  tagChange(ev) {
    this.store.dispatch(
      new ServiceActions.UpdateHallFilterAction({
        service: ev,
        offset: 0,
      }),
    )
  }

  onPageChange(ev) {
    console.log('onPageChange', ev)
    const offset = (ev - 1) * this.pagingSize
    this.store.dispatch(
      new ServiceActions.UpdateHallFilterAction({
        offset,
      }),
    )
  }

  pm(item) {
    this.store.dispatch(new ServiceActions.PMAction(item))
  }

  vouch(item) {
    // this.store.dispatch(new ServiceActions.VouchAction(item))
    this.appEntityServices.vouchService.add({ service: item.id, karma: 1 })
  }

  disapprove(item) {
    this.store.dispatch(new ServiceActions.DisapproveAction(item))
    // this.appEntityServices.vouchService.add({ service: item.id, karma: -1 })
  }

  hideString(text) {
    return text.replace(/\w/gi, '*') + text.substr(-3)
  }
}
