import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpTokenInterceptor } from './interceptors'

import { ApiService, JwtService, ProfilesService, UserService } from './services'

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    ProfilesService,
    UserService,
  ],
  declarations: [],
})
export class CoreModule {}
