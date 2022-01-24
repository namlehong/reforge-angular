import { Injectable } from '@angular/core'
import { DefaultHttpUrlGenerator, HttpResourceUrls, normalizeRoot, Pluralizer } from '@ngrx/data'

@Injectable({ providedIn: 'root' })
export class MyHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(private myPluralizer: Pluralizer) {
    super(myPluralizer)
  }

  protected getResourceUrls(entityName: string, root: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName]
    if (!resourceUrls) {
      const nRoot = normalizeRoot(root)
      const _url = `${nRoot}/${this.myPluralizer.pluralize(entityName)}/`.toLowerCase()
      resourceUrls = {
        entityResourceUrl: _url,
        collectionResourceUrl: _url,
      }
      this.registerHttpResourceUrls({ [entityName]: resourceUrls })
    }
    return resourceUrls
  }
}
