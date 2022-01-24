import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { NzDrawerService, NzModalService, NzNotificationService } from 'ng-zorro-antd'
import { Observable, of } from 'rxjs'
import * as PoeServicesAction from './actions'
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators'
import * as Reducers from '../reducers'
import { NewServiceComponent } from '../../components/reforge-widgets/new-service/new-service.component'
import { MyServiceService } from '../../core/services/my-service.service'
import { DisapproveFormComponent } from '../../components/reforge-widgets/disapprove-form/disapprove-form.component'
import { VouchService } from '../../core/services/vouch.service'
import { ProfilesService } from '../../core/services'
import { UserService } from '../../core/models'

const service2text = (i: UserService) => {
  let text = `> ${i.serviceInfo.title}`
  if (i.item_level < 76) {
    text += ` (${i.item_level})`
  }

  text += ` [${i.price}]`

  return text
}

@Injectable()
export class PoeServicesEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private myService: MyServiceService,
    private vouchService: VouchService,
    private profilesService: ProfilesService,
    private drawerService: NzDrawerService,
  ) {}

  openModal(item) {
    const modal = this.drawerService.create({
      nzTitle: item.id ? `Edit Service` : `New Service`,
      nzWidth: 500,
      nzContent: NewServiceComponent,
      nzContentParams: {
        item,
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      // nzFooter: [
      //   {
      //     label: 'Close',
      //     onClick: componentInstance => {
      //       console.log(componentInstance.testForm.value)
      //       modal.close()
      //     },
      //   },
      //   {
      //     label: 'Submit',
      //     type: 'primary',
      //     onClick: componentInstance => {
      //       const newData = Object.assign({}, item, componentInstance.testForm.value)
      //       newData.id ? this.myService.update(newData) : this.myService.add(newData)
      //       modal.close()
      //     },
      //   },
      // ],
    })
  }

  @Effect({ dispatch: false })
  createService: Observable<any> = this.actions.pipe(
    ofType('[TopBar] New Service'),
    // map((action: PoeServicesAction.CreateServiceAction) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getLeague)))),
    ),
    tap(([, league]) => {
      const item = {
        league: league.id,
        price: 'offer',
        chaos_equal: 0,
        ex_equal: 0,
        options: [],
        tags: [],
      }

      this.openModal(item)
    }),
  )

  @Effect({ dispatch: false })
  editService: Observable<any> = this.actions.pipe(
    ofType(PoeServicesAction.EDIT_SERVICE),
    map((action: PoeServicesAction.EditServiceAction) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getLeague)))),
    ),
    tap(([item, league]) => this.openModal(item)),
  )

  @Effect()
  pmService: Observable<any> = this.actions.pipe(
    ofType(PoeServicesAction.PM),
    map((action: PoeServicesAction.PMAction) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getLeague)))),
    ),
    map(([item, league]) => {
      const msg = `@${item.profile.poe.name} Hi, I would like to buy your ${item.serviceInfo.title} listed for ${item.price} in ${league.name} (reforge.poe.dev)`
      this.copyMessage(msg)
      this.notification.info('Copied!', msg)
      return { type: '[PoE Service Effect] PM Success' }
    }),
  )

  // show error effect
  @Effect({ dispatch: false })
  displayError: Observable<any> = this.actions.pipe(
    ofType('[MyService] @ngrx/data/save/add-one/error', '[Vouch] @ngrx/data/save/add-one/error'),
    map((action: any) => action.payload),
    tap(payload => {
      const _error = payload.data.error.error.error
      console.log('_err', _error)
      if (_error.hasOwnProperty('errors')) {
        const msg = Array.isArray(_error.errors)
          ? _error.errors
          : Object.keys(_error.errors).map(k => `${k}: ${_error.errors[k]}`)
        this.notification.error('Error!', msg.join('/n'))
      }
    }),
  )

  // show vouch success
  @Effect({ dispatch: false })
  displayVouchSuccess: Observable<any> = this.actions.pipe(
    ofType('[Vouch] @ngrx/data/save/add-one/success'),
    tap(action => {
      this.notification.success('Vouch Success!', '')
      // this.profilesService.profileReload$.next('')
      // this.profilesService.getByKey(action.payload.data.receiver_username)
      // this.vouchService.profileReload$.next('')
    }),
  )

  @Effect({ dispatch: false })
  exportService: Observable<any> = this.actions.pipe(
    ofType(PoeServicesAction.COPY_DISCORD_EXPORT),
    map((action: any) => action.payload),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.rxStore.pipe(select(Reducers.getPoeProfile)),
          this.rxStore.pipe(select(Reducers.getLeague)),
          this.rxStore.pipe(select(Reducers.getUser)),
          this.rxStore.pipe(select(Reducers.getSettings)),
        ),
      ),
    ),
    tap(([items, profile, league, user, settings]) => {
      console.log('league', league)
      let msg = `WTS ${league.name}`
      if (settings.export_include_ign) {
        msg += `\nIGN: ${user.profile.last_character.name}`
      }

      // filter inactive
      items = items.filter(i => i.is_active)

      // group
      const grp_aug = items.filter(
        i => i.serviceInfo.tags && ['augment', 'augment-lucky'].includes(i.serviceInfo.tags[0]),
      )
      const grp_remove = items.filter(
        i => i.serviceInfo.tags && ['remove'].includes(i.serviceInfo.tags[0]),
      )
      const grp_remove_add = items.filter(
        i => i.serviceInfo.tags && ['remove-add'].includes(i.serviceInfo.tags[0]),
      )
      const grp_other = items.filter(
        i =>
          i.serviceInfo.tags &&
          !['augment', 'augment-lucky', 'remove', 'remove-add'].includes(i.serviceInfo.tags[0]),
      )

      if (grp_aug.length > 0) {
        msg += '\n\n#------AUGMENT------\n'
        msg += grp_aug.map(service2text).join('\n')
      }

      if (grp_remove.length > 0) {
        msg += '\n\n#------REMOVE------\n'
        msg += grp_remove.map(service2text).join('\n')
      }

      if (grp_remove_add.length > 0) {
        msg += '\n\n#------REMOVE-ADD-------\n'
        msg += grp_remove_add.map(service2text).join('\n')
      }

      if (grp_other.length > 0) {
        msg += '\n\n#------OTHERS------\n'
        msg += grp_other.map(service2text).join('\n')
      }

      // wrap in css
      if (settings.export_coloring) {
        msg = '```css\n' + msg + '\n```'
      }

      if (settings.export_note) {
        msg += `\n${settings.export_note}`
      }

      msg += `\nAll of my services: https://reforge.poe.dev/trading/profile/${user.username}`

      // this.copyMessage('```css\n' + msg + '\n```')
      this.copyMessage(msg)
      this.notification.info('Copied!', 'paste to discord')
    }),
  )

  copyMessage(val: string) {
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = val
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
  }

  @Effect({ dispatch: false })
  loadHall: Observable<any> = this.actions.pipe(
    ofType(PoeServicesAction.UPDATE_HALL_FILTER, '[League Switcher] Change league'),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getHallQuery)))),
    ),
    tap(([, qs]) => {
      console.log('should load', qs)
      // this.userService.clearCache()
      // this.userService.getWithQuery(qs)
    }),
  )

  @Effect({ dispatch: false })
  attemptDisapprove: Observable<any> = this.actions.pipe(
    ofType(PoeServicesAction.DISAPPROVE),
    map((action: any) => action.payload),
    tap(item => {
      const drawer = this.drawerService.create({
        nzTitle: 'Disapprove',
        nzContent: DisapproveFormComponent,
        nzWidth: 500,
        nzContentParams: {
          item: item,
        },
      })
      // console.log('should load', qs)
      // this.userService.clearCache()
      // this.userService.getWithQuery(qs)
    }),
  )
}
