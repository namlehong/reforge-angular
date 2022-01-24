import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import * as SettingsActions from '../../../../../store/settings/actions'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 0
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''
  theme: string = ''
  isSidebarOpen: boolean = false
  primaryColor: string

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.name = state.name
      this.role = state.role
      this.email = state.email
    })

    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.theme = state.theme
      this.isSidebarOpen = state.isSidebarOpen
      this.primaryColor = state.primaryColor
    })
  }

  badgeCountIncrease() {
    // this.badgeCount = this.badgeCount + 1
  }

  logout() {
    this.store.dispatch(new UserActions.Logout())
  }

  setTheme(nextTheme, ev) {
    if (ev) {
      ev.stopPropagation()
      ev.preventDefault()
    }

    this.store.dispatch(
      new SettingsActions.SetStateAction({
        theme: nextTheme,
      }),
    )
  }

  get isDark() {
    return this.theme === 'dark'
  }

  toggleSidebar() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    )
  }

  setPrimaryColor(e) {
    const color = e.target ? e.target.value : e
    const addStyles = () => {
      const styleElement = document.querySelector('#primaryColor')
      if (styleElement) {
        styleElement.remove()
      }
      const body = document.querySelector('body')
      const styleEl = document.createElement('style')
      const css = document.createTextNode(`:root { --kit-color-primary: ${color};}`)
      styleEl.setAttribute('id', 'primaryColor')
      styleEl.appendChild(css)
      body.appendChild(styleEl)
    }
    addStyles()
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        primaryColor: color,
      }),
    )
  }
}
