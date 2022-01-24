import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LOCALE_ID, NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { TimeagoModule } from 'ngx-timeago'

// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { en_US as localeZorro, NZ_I18N } from 'ng-zorro-antd'
import { ReforgeWidgetsModule } from './components/reforge-widgets/reforge-widgets.module'
// ngrx/data
import { AppStoreModule } from './store/app-store.module'

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    TimeagoModule.forRoot(),
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReforgeWidgetsModule,
    AppStoreModule,

    // translate
    TranslateModule.forRoot(),

    // ngrx
    // StoreModule.forRoot(reducers, { metaReducers }),
    // EffectsModule.forRoot([UserEffects, PoeServicesEffects, BenchModsEffects, HarvestModsEffects]),
    // StoreRouterConnectingModule.forRoot(),
    // EntityDataModule.forRoot(entityConfig),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
  ],
  providers: [
    // locale providers
    ...LOCALE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
