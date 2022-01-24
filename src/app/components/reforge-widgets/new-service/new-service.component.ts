import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../../core/models'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { debounceTime, map, switchMap, take } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { AppEntityServices } from '../../../store/entity/entity-services'
import * as Reducers from 'src/app/store/reducers'
import { NzDrawerRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
})
export class NewServiceComponent implements OnInit {
  @Input()
  item: UserService

  testForm: FormGroup

  value?: string

  fuzzySearch$ = new BehaviorSubject('')

  hallServices$: Observable<{ value; label }[]>
  isHarvest = false
  servicePrice: { average: number; median: number }

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private appEntityServices: AppEntityServices,
    private drawerRef: NzDrawerRef<string>,
  ) {
    this.hallServices$ = appEntityServices.hallService.filteredOptionsEntities$

    const priceMap$ = this.store.pipe(select(Reducers.getHallPriceMap))

    this.fuzzySearch$
      .pipe(debounceTime(500))
      .subscribe(pattern => appEntityServices.hallService.setFilter(pattern))

    this.testForm = this.fb.group({
      service: [null, [Validators.required]],
      price: '10c',
      // chaos_equal: 0,
      // ex_equal: 0,
      item_level: 76,
    })

    combineLatest([
      this.testForm.controls['service'].valueChanges,
      this.appEntityServices.hallService.entityMap$,
    ])
      .pipe(map(([id, services]) => (services[id] ? services[id].category === 3 : false)))
      .subscribe(data => (this.isHarvest = data))

    combineLatest([this.testForm.controls['service'].valueChanges, priceMap$])
      .pipe(
        map(
          ([id, priceMap]) =>
            priceMap[id] || {
              average: 0,
              median: 0,
            },
        ),
      )
      .subscribe(data => (this.servicePrice = data))
  }

  ngOnInit(): void {
    this.testForm.patchValue(this.item, { emitEvent: true })
  }

  onSearch(ev) {
    this.fuzzySearch$.next(ev)
  }

  submit() {
    if (!this.testForm.valid) {
      return
    }

    const newData = Object.assign({}, this.item, this.testForm.value)

    if (newData.id) {
      this.appEntityServices.myService
        .update(newData)
        .pipe(take(1))
        .subscribe(() => this.drawerRef.close())
    } else {
      // update old data with same service
      this.appEntityServices.myService.entities$
        .pipe(
          take(1),
          switchMap(entities => {
            const oldService = entities.filter(
              i => i.service === newData.service && i.league === newData.league,
            )

            if (oldService.length > 0) {
              const updateData = Object.assign({}, oldService[0], newData, { is_active: true })
              return this.appEntityServices.myService.update(updateData)
            } else {
              return this.appEntityServices.myService.add(newData)
            }
          }),
        )
        .subscribe(() => this.drawerRef.close())
    }
  }
}
