import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpUrlGenerator, Logger, QueryParams } from '@ngrx/data'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Vouch } from '../../core/models'
import { Store } from '@ngrx/store'
import { AppDataService } from './app-data-service-factory'
import { CategoryService } from '../../core/services'

@Injectable()
export class VouchDataService extends AppDataService<Vouch> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
    private store: Store<any>,
    private categoryService: CategoryService,
  ) {
    super('Vouch', http, httpUrlGenerator)
  }

  getAll(): Observable<Vouch[]> {
    return super.getAll().pipe(map((data: any) => data.results))
  }

  getWithQuery(params: string | QueryParams): Observable<Vouch[]> {
    return super.getWithQuery(params).pipe(map((data: any) => data.results))
  }
}
