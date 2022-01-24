import { Injectable, Optional } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpMethods,
  HttpUrlGenerator,
} from '@ngrx/data'

export class AppDataService<T> extends DefaultDataService<T> {
  protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
    if (url[url.length - 1] === '/') {
      url = url.slice(0, -1)
    }
    return super.execute(method, url, data, options)
  }
}

/**
 * Create a basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
@Injectable()
export class AppDataServiceFactory {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Optional() protected config?: DefaultDataServiceConfig,
  ) {
    config = config || {}
    httpUrlGenerator.registerHttpResourceUrls(config.entityHttpResourceUrls)
  }

  /**
   * Create a default {EntityCollectionDataService} for the given entity type
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new AppDataService<T>(entityName, this.http, this.httpUrlGenerator, this.config)
  }
}
