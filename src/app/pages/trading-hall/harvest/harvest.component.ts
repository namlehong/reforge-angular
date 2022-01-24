import { Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs'
import { HallService, UserService } from '../../../core/models'
import { FormBuilder, FormControl } from '@angular/forms'
import { Dictionary } from '@ngrx/entity'
import { select, Store } from '@ngrx/store'
import { AppEntityServices } from '../../../store/entity/entity-services'
import { NzDrawerService } from 'ng-zorro-antd'
import * as Reducers from '../../../store/reducers'
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import * as ServiceActions from '../../../store/poe-services/actions'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss'],
})
export class HarvestComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject()

  league: string

  tableLoading$ = this.appEntityServices.betaService.loading$

  itemLevelControl: FormControl = this.fb.control(76)
  modFilterControl: FormControl = this.fb.control('')

  pagingSize: number = 50

  hallServiceMap: Dictionary<HallService>

  authorized = false
  category$ = this.activatedRoute.data.pipe(
    map(data => data['category']),
    shareReplay(1),
  )

  hallServicesLoading$ = this.appEntityServices.hallService.loading$
  hallServices$ = combineLatest([
    this.appEntityServices.hallService.filteredActiveEntities$,
    this.store.select(Reducers.getHallBeta),
    this.category$,
  ]).pipe(
    map(([items, selected, category]) => {
      const result = items
        .filter(i => i.category === category)
        .map(i => ({ ...i, checked: selected.includes(i.id) }))
      return result.sort((a, b) => {
        return b.checked !== a.checked ? b.checked - a.checked : a.id - b.id
      })
    }),
    shareReplay(1),
  )

  checkServiceId$ = this.hallServices$.pipe(map(items => items.map(i => i.id)))

  itemList: UserService[] = []
  itemList$ = combineLatest([
    this.appEntityServices.betaService.filteredEntities$,
    this.checkServiceId$,
  ]).pipe(
    map(([items, serviceIds]) => items.filter(i => serviceIds.includes(i.service))),
    shareReplay(1),
  )

  listOfColumn = [
    {
      title: '#',
      compare: (a: UserService, b: UserService) => a.approved - b.approved,
      priority: 2,
    },
    {
      title: 'Info',
      compare: (a: UserService, b: UserService) => a.service - b.service,
      priority: 1,
    },
    {
      title: 'Price',
      compare: (a: UserService, b: UserService) => a.chaos_equivalent - b.chaos_equivalent,
      priority: 3,
    },
  ]

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private appEntityServices: AppEntityServices,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.pipe(
      map(data => data['category']),
      shareReplay(1),
    )

    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
    })
    this.appEntityServices.hallService.entityMap$.subscribe(data => (this.hallServiceMap = data))

    this.modFilterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(pattern => this.appEntityServices.hallService.setFilter(pattern))

    // item level input

    this.itemLevelControl.valueChanges.pipe(debounceTime(500)).subscribe(min_item_level =>
      this.store.dispatch({
        type: '[Hall] Update filter',
        payload: { min_item_level },
      }),
    )

    // update data
    this.store.pipe(select(Reducers.getUserServices)).subscribe(data => (this.itemList = data))
  }

  refresh() {
    this.appEntityServices.betaService.clearCache()
    this.store
      .select(Reducers.getHallBeta)
      .pipe(
        take(1),
        concatMap(action =>
          of(action).pipe(withLatestFrom(this.store.pipe(select(Reducers.getLeagueId)))),
        ),
        tap(([ids, league]) =>
          ids.forEach(service =>
            this.appEntityServices.betaService.getWithQuery({ service, league }),
          ),
        ),
      )
      .subscribe()
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  pm(item, dataRef) {
    if (dataRef) {
      dataRef.pmed = true
    }
    this.store.dispatch(
      new ServiceActions.PMAction({ ...item, serviceInfo: this.hallServiceMap[item.service] }),
    )
  }

  vouch(item) {
    // this.store.dispatch(new ServiceActions.VouchAction(item))
    this.appEntityServices.vouchService.add({ service: item.id, karma: 1 })
  }

  disapprove(item) {
    this.store.dispatch(
      new ServiceActions.DisapproveAction({
        ...item,
        serviceInfo: this.hallServiceMap[item.service],
      }),
    )
    // this.appEntityServices.vouchService.add({ service: item.id, karma: -1 })
  }

  hideString(text) {
    return text.replace(/\w/gi, '*') + text.substr(-3)
  }

  toggleService(item: UserService, ev) {
    this.store.dispatch({
      type: ev ? '[Hall Beta] Add Service' : '[Hall Beta] Remove Service',
      payload: item.id,
    })
  }
}
