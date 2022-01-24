import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from '@ngrx/data'

import { Observable } from 'rxjs'
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators'
import { UserService } from '../../core/models'
import { Store } from '@ngrx/store'
import { AppDataService } from './app-data-service-factory'
import { CategoryService } from '../../core/services'

@Injectable()
export class UserDataService extends AppDataService<UserService> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
    private store: Store<any>,
    private categoryService: CategoryService,
  ) {
    super('UserService', http, httpUrlGenerator)
  }

  getAll(): Observable<UserService[]> {
    return super.getAll().pipe(
      tap((data: any) =>
        this.store.dispatch({ type: '[Hall] Update Counter', payload: { count: data.count } }),
      ),
      map((data: any) => data.results),
    )
  }

  getWithQuery(params: string | QueryParams): Observable<UserService[]> {
    return super.getWithQuery(params).pipe(
      tap((data: any) =>
        this.store.dispatch({ type: '[Hall] Update Counter', payload: { count: data.count } }),
      ),
      map((data: any) => data.results),
    )
  }
}
