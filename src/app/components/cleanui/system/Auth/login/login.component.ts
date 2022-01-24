import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import { environment } from '../../../../../../environments/environment'
import { fromEvent } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

@Component({
  selector: 'cui-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent {
  form: FormGroup
  logo: String
  authProvider: string = 'firebase'
  loading: boolean = false

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.form = fb.group({
      email: ['demo@reforge.poe.dev', [Validators.required, Validators.minLength(4)]],
      password: ['demo123', [Validators.required]],
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })

    fromEvent<StorageEvent>(window, 'storage')
      .pipe(filter(({ key }) => key === 'app.poe.auth'))
      .subscribe(({ newValue }) => {
        this.store.dispatch(new UserActions.Login({ code: newValue }))
      })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    const payload = {
      email: this.email.value,
      password: this.password.value,
    }
    this.store.dispatch(new UserActions.Login(payload))
  }

  poeLogin(): void {
    console.log('Login Via PoE')
    // this.store.dispatch(new UserActions.Login({code: 'abc' }))
    console.log(window.screen)
    const height = 600
    const width = 500
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    window.open(
      environment.poe_oauth2_url,
      'poe_login',
      `height=${height},width=${width},top=${top},left=${left}`,
    )
  }

  setProvider(authProvider) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        authProvider,
      }),
    )
  }
}
